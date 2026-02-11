import {config} from 'dotenv'
config()
export const verifyApiKey = (req, res, next) => {
  const apikey = req.headers.apikey || req.headers.Apikey;
  if (!apikey) return res.status(401).json({resultCode :401 ,resultDesc : "unauthorization",detail : null});
  if (process.env.APIKEY !== apikey) return res.status(403).json({resultCode :403 ,resultDesc : "forbidden",detail : null}); 
    next();
};
