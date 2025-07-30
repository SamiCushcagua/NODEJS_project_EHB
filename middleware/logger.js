//zal een log achterlaten om na te gaan wie iets gedaan heeft dus porst o get delete.. ip .
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();//zet datum naar string
    const method = req.method;
    const url = req.url;
    const ip = req.ip || req.connection.remoteAddress;
    
    console.log(`[${timestamp}] ${method} ${url} - IP: ${ip}`);
    
   
    next();
};

export default logger;