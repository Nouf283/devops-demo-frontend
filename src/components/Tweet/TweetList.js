import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import TweetForm from './TweetForm';
import TweetCard from './TweetCard';
import api from '../../services/api';

const TweetList = () => {
    const [tweets, setTweets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { isAuthenticated } = useAuth();

    const fetchTweets = async () => {
        try {
            setLoading(true);
            const response = await api.get('/tweets');
            setTweets(response.data);
            setError('');
        } catch (err) {
            setError('Failed to load tweets');
            console.error('Error fetching tweets:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTweets();
    }, []);

    const handleNewTweet = () => {
        fetchTweets(); // Refresh the tweets list
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-lg">Loading tweets...</div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {isAuthenticated && <TweetForm onTweetCreated={handleNewTweet} />}

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                {tweets.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No tweets yet. {isAuthenticated ? 'Be the first to tweet!' : 'Login to start tweeting!'}
                    </div>
                ) : (
                    tweets.map((tweet) => (
                        <TweetCard key={tweet.id} tweet={tweet} />
                    ))
                )}
            </div>
        </div>
    );
};

export default TweetList;