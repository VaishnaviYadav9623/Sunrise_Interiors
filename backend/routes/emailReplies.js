const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const Contact = require("../models/Contact");
const Consultation = require("../models/Consultation");
const Quote = require("../models/Quote");
const auth = require("../middleware/auth");

const router = express.Router();

const requestModels = {
    contacts: Contact,
    consultations: Consultation,
    quotes: Quote
};

const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
const smtpPort = Number(process.env.SMTP_PORT || 465);
const smtpSecure = process.env.SMTP_SECURE
    ? process.env.SMTP_SECURE === "true"
    : smtpPort === 465;
const smtpConfigured = Boolean(
    Number.isInteger(smtpPort) &&
    smtpPort > 0 &&
    smtpPort <= 65535 &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
);

const transporter = smtpConfigured
    ? nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    })
    : null;

const isValidEmail = (email) =>
    typeof email === "string" &&
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

router.post("/", auth, async (req, res) => {
    if (!req.admin || req.admin.role !== "admin") {
        return res.status(403).json({
            message: "Administrator access required."
        });
    }

    const { type, requestId, subject, message } = req.body || {};

    if (!Object.prototype.hasOwnProperty.call(requestModels, type)) {
        return res.status(400).json({
            message: "Invalid request type."
        });
    }

    if (
        typeof requestId !== "string" ||
        !/^[a-f\d]{24}$/i.test(requestId) ||
        !mongoose.Types.ObjectId.isValid(requestId)
    ) {
        return res.status(400).json({
            message: "Invalid request ID."
        });
    }

    if (
        typeof subject !== "string" ||
        !subject.trim() ||
        subject.trim().length > 200 ||
        /[\r\n]/.test(subject)
    ) {
        return res.status(400).json({
            message: "Enter a valid subject of 200 characters or fewer."
        });
    }

    if (
        typeof message !== "string" ||
        !message.trim() ||
        message.trim().length > 10000
    ) {
        return res.status(400).json({
            message: "Enter a message of 10,000 characters or fewer."
        });
    }

    if (!transporter) {
        return res.status(503).json({
            message: "Gmail email is not configured. Add SMTP_USER and a Gmail app password as SMTP_PASS to backend/.env, then restart the backend."
        });
    }

    let request;

    try {
        request = await requestModels[type].findById(requestId);
    } catch (error) {
        console.error("Failed to load request for email reply:", error.message);
        return res.status(500).json({
            message: "Unable to load the request. Please try again."
        });
    }

    if (!request) {
        return res.status(404).json({
            message: "Request not found."
        });
    }

    const recipient = request.email;

    if (!isValidEmail(recipient)) {
        return res.status(422).json({
            message: "The request does not contain a valid customer email address."
        });
    }

    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to: recipient,
            subject: subject.trim(),
            text: message.trim()
        });

        let statusWarning;

        if (type === "contacts" && request.status !== "replied") {
            try {
                const updatedContact = await Contact.findByIdAndUpdate(
                    requestId,
                    { status: "replied" },
                    { runValidators: true }
                );
                if (!updatedContact) {
                    statusWarning = "Email sent, but the enquiry was no longer available to update.";
                }
            } catch (error) {
                console.error(
                    "Reply email was sent, but contact status could not be updated:",
                    error.message
                );
                statusWarning = "Email sent, but the enquiry status could not be updated.";
            }
        }

        return res.json({
            message: statusWarning || "Reply email sent successfully.",
            ...(statusWarning ? { warning: statusWarning } : {})
        });
    } catch (error) {
        console.error("Failed to send enquiry reply email:", error.message);

        return res.status(502).json({
            message: "The reply email could not be sent. Check the email service configuration and try again."
        });
    }
});

module.exports = router;
