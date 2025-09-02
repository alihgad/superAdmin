"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (schema) => (req, res, next) => {
    if (req?.body?.title && req?.body?.title[0] === "{") {
        req.body.title = JSON.parse(req.body.title);
    }
    if (req?.body?.content && req?.body?.content[0] === "{") {
        req.body.content = JSON.parse(req.body.content);
    }
    if (req.body?.arabic && typeof req.body.arabic === "string") {
        req.body.arabic = JSON.parse(req.body.arabic);
    }
    if (req.body?.english && typeof req.body.english === "string") {
        req.body.english = JSON.parse(req.body.english);
    }
    if (req.body?.article && typeof req.body.article === "string") {
        req.body.article = JSON.parse(req.body.article);
    }
    if (req.body?.sections && typeof req.body.sections === "string") {
        req.body.sections = JSON.parse(req.body.sections);
    }
    if (req.body?.content && typeof req.body.content === "string") {
        req.body.content = JSON.parse(req.body.content);
    }
    let keys = Object.keys(schema);
    let errors = [];
    keys.forEach((key) => {
        let { error } = schema[key].validate(req[key], { abortEarly: false });
        if (error) {
            errors.push(error.message);
        }
    });
    if (errors.length > 0) {
        console.log("errors", errors);
        return res.status(500).json({ errors });
    }
    else {
        console.log("next");
        next();
    }
};
//# sourceMappingURL=validator.js.map