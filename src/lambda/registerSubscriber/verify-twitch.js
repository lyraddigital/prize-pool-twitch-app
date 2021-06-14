"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTwitchRequest = void 0;
const isValidTwitchRequest = (secretKey, currentSignature, messageId, timestamp, messageBody) => {
    /*const bodyBuff = new Buffer(JSON.stringify(messageBody));
    const unencodedValue = `${messageId}${timestamp}${bodyBuff}`;
    
    const calculatedSignature = crypto.createHmac("sha256", secretKey)
                                      .update(unencodedValue)
                                      .digest("hex");
                                      
    console.log('Signature', currentSignature);
    console.log('Calculated Signature', calculatedSignature);
    
    return currentSignature === calculatedSignature;*/
    return true;
};
exports.isValidTwitchRequest = isValidTwitchRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5LXR3aXRjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZlcmlmeS10d2l0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRU8sTUFBTSxvQkFBb0IsR0FBRyxDQUNoQyxTQUFpQixFQUNqQixnQkFBd0IsRUFDeEIsU0FBaUIsRUFDakIsU0FBaUIsRUFDakIsV0FBbUIsRUFDckIsRUFBRTtJQUNBOzs7Ozs7Ozs7O3NEQVVrRDtJQUVsRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDLENBQUE7QUFwQlksUUFBQSxvQkFBb0Isd0JBb0JoQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUhtYWMgfSBmcm9tICdjcnlwdG8nO1xuXG5leHBvcnQgY29uc3QgaXNWYWxpZFR3aXRjaFJlcXVlc3QgPSAoXG4gICAgc2VjcmV0S2V5OiBzdHJpbmcsIFxuICAgIGN1cnJlbnRTaWduYXR1cmU6IHN0cmluZyxcbiAgICBtZXNzYWdlSWQ6IHN0cmluZyxcbiAgICB0aW1lc3RhbXA6IHN0cmluZyxcbiAgICBtZXNzYWdlQm9keTogc3RyaW5nXG4pID0+IHtcbiAgICAvKmNvbnN0IGJvZHlCdWZmID0gbmV3IEJ1ZmZlcihKU09OLnN0cmluZ2lmeShtZXNzYWdlQm9keSkpO1xuICAgIGNvbnN0IHVuZW5jb2RlZFZhbHVlID0gYCR7bWVzc2FnZUlkfSR7dGltZXN0YW1wfSR7Ym9keUJ1ZmZ9YDtcbiAgICBcbiAgICBjb25zdCBjYWxjdWxhdGVkU2lnbmF0dXJlID0gY3J5cHRvLmNyZWF0ZUhtYWMoXCJzaGEyNTZcIiwgc2VjcmV0S2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudXBkYXRlKHVuZW5jb2RlZFZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZGlnZXN0KFwiaGV4XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICBjb25zb2xlLmxvZygnU2lnbmF0dXJlJywgY3VycmVudFNpZ25hdHVyZSk7XG4gICAgY29uc29sZS5sb2coJ0NhbGN1bGF0ZWQgU2lnbmF0dXJlJywgY2FsY3VsYXRlZFNpZ25hdHVyZSk7XG4gICAgXG4gICAgcmV0dXJuIGN1cnJlbnRTaWduYXR1cmUgPT09IGNhbGN1bGF0ZWRTaWduYXR1cmU7Ki9cbiAgICBcbiAgICByZXR1cm4gdHJ1ZTtcbn0iXX0=