


export default function validate(schema) {
  return (req, res, next) => {
  try {
    // Parse JSON strings if they exist
    if (req?.body?.title && req?.body?.title[0] === "{") {
      req.body.title = JSON.parse(req.body.title)
    }

    if (req?.body?.content && req?.body?.content[0] === "{") {
      req.body.content = JSON.parse(req.body.content)
    }

    if (req.body?.arabic && typeof req.body.arabic === 'string') {
      req.body.arabic = JSON.parse(req.body.arabic)
    }

    if (req.body?.english && typeof req.body.english === 'string') {
      req.body.english = JSON.parse(req.body.english)
    }

    if (req.body?.article && typeof req.body.article === 'string') {
      req.body.article = JSON.parse(req.body.article)
    }

    if (req.body?.sections && typeof req.body.sections === 'string') {
      req.body.sections = JSON.parse(req.body.sections)
    }

    // Validate using Joi schema
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json({ 
        success: false,
        message: "validation error",
        errors 
      });
    }

    next();
  } catch (err) {
    return res.status(400).json({ 
      success: false,
      message: "error from validator",
      error: err.message 
    });
  }

}

}


