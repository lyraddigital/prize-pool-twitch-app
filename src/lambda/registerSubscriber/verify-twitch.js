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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyaWZ5LXR3aXRjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZlcmlmeS10d2l0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRU8sTUFBTSxvQkFBb0IsR0FBRyxDQUNoQyxTQUFpQixFQUNqQixnQkFBd0IsRUFDeEIsU0FBaUIsRUFDakIsU0FBaUIsRUFDakIsV0FBbUIsRUFDckIsRUFBRTtJQUNBOzs7Ozs7Ozs7O3NEQVVrRDtJQUVsRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDLENBQUE7QUFwQlksUUFBQSxvQkFBb0Isd0JBb0JoQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUhtYWMgfSBmcm9tICdjcnlwdG8nO1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzVmFsaWRUd2l0Y2hSZXF1ZXN0ID0gKFxyXG4gICAgc2VjcmV0S2V5OiBzdHJpbmcsIFxyXG4gICAgY3VycmVudFNpZ25hdHVyZTogc3RyaW5nLFxyXG4gICAgbWVzc2FnZUlkOiBzdHJpbmcsXHJcbiAgICB0aW1lc3RhbXA6IHN0cmluZyxcclxuICAgIG1lc3NhZ2VCb2R5OiBzdHJpbmdcclxuKSA9PiB7XHJcbiAgICAvKmNvbnN0IGJvZHlCdWZmID0gbmV3IEJ1ZmZlcihKU09OLnN0cmluZ2lmeShtZXNzYWdlQm9keSkpO1xyXG4gICAgY29uc3QgdW5lbmNvZGVkVmFsdWUgPSBgJHttZXNzYWdlSWR9JHt0aW1lc3RhbXB9JHtib2R5QnVmZn1gO1xyXG4gICAgXHJcbiAgICBjb25zdCBjYWxjdWxhdGVkU2lnbmF0dXJlID0gY3J5cHRvLmNyZWF0ZUhtYWMoXCJzaGEyNTZcIiwgc2VjcmV0S2V5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC51cGRhdGUodW5lbmNvZGVkVmFsdWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmRpZ2VzdChcImhleFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgIGNvbnNvbGUubG9nKCdTaWduYXR1cmUnLCBjdXJyZW50U2lnbmF0dXJlKTtcclxuICAgIGNvbnNvbGUubG9nKCdDYWxjdWxhdGVkIFNpZ25hdHVyZScsIGNhbGN1bGF0ZWRTaWduYXR1cmUpO1xyXG4gICAgXHJcbiAgICByZXR1cm4gY3VycmVudFNpZ25hdHVyZSA9PT0gY2FsY3VsYXRlZFNpZ25hdHVyZTsqL1xyXG4gICAgXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufSJdfQ==