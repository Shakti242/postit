import React from 'react';

interface CardProps {
    name: string;
    url: string;
}

const Card: React.FC<CardProps> = ({ name, url }) => {
    return (
        <div className="p-4 border rounded-md bg-white shadow-md hover:bg-gray-100 transition duration-300">
            <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                {name}
            </a>
        </div>
    );
};

export default Card;
