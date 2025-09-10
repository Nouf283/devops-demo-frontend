import React from 'react';

const TweetCard = ({ tweet }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">
              {tweet.username.charAt(0).toUpperCase()}
            </span>
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                        <h4 className="text-sm font-semibold text-gray-900">
                            @{tweet.username}
                        </h4>
                    </div>
                    <p className="mt-2 text-gray-800 whitespace-pre-wrap">
                        {tweet.content}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TweetCard;