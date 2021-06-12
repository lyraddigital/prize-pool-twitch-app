exports.handler = async (event) => {    
    const { Records: records } = event;
    
    for (let record of records) {
        const { eventName } = record;
        
        if (eventName === 'INSERT') {
            const { dynamodb: { NewImage: subscriber }} = record;
            const {
                UserId: { S: userId },
                Username: { S: username },
                DisplayName: { S: displayName }
            } = subscriber;                    
            
            console.log(userId, username, displayName);

            // Fire a call to my new AppSync endpoint, which will in turn talk to my Twitch Bot
        }
    }
};