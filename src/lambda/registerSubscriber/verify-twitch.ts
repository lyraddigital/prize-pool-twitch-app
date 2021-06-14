import { createHmac } from 'crypto';

export const isValidTwitchRequest = (
    secretKey: string, 
    currentSignature: string,
    messageId: string,
    timestamp: string,
    messageBody: string
) => {
    /*const bodyBuff = new Buffer(JSON.stringify(messageBody));
    const unencodedValue = `${messageId}${timestamp}${bodyBuff}`;
    
    const calculatedSignature = crypto.createHmac("sha256", secretKey)
                                      .update(unencodedValue)
                                      .digest("hex");
                                      
    console.log('Signature', currentSignature);
    console.log('Calculated Signature', calculatedSignature);
    
    return currentSignature === calculatedSignature;*/
    
    return true;
}