import React, { useState } from 'react';
import api from '../../services/api';

const TweetForm = ({ onTweetCreated }) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setLoading(true);
        setError('');

        try {
            // Using FormData for the request as backend expects @RequestParam
            const formData = new FormData();
            formData.append('content', content.trim());

            await api.post('/tweets', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setContent('');
            onTweetCreated();
        } catch (err) {
            setError('Failed to post tweet');
            console.error('Error creating tweet:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">What's happening?</h3>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            maxLength="280"
        />

                <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {content.length}/280 characters
          </span>
                    <button
                        type="submit"
                        disabled={loading || !content.trim()}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Tweeting...' : 'Tweet'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TweetForm;