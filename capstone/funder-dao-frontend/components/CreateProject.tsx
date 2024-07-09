import React, { useState } from 'react';
import { useSolana } from '../hooks/useSolana';


const CreateProject: React.FC = () => {
    const [productName, setProductName] = useState('');
    const [productIdea, setProductIdea] = useState('');
    const [productStrategy, setProductStrategy] = useState('');
    const [productAsk, setProductAsk] = useState<number | ''>('');
    const { createVoting } = useSolana();


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            await createVoting("testdemo")

        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Create Project</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                        Product Name
                    </label>
                    <input
                        id="productName"
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productIdea">
                        Product Idea
                    </label>
                    <textarea
                        id="productIdea"
                        value={productIdea}
                        onChange={(e) => setProductIdea(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productStrategy">
                        Product Strategy
                    </label>
                    <textarea
                        id="productStrategy"
                        value={productStrategy}
                        onChange={(e) => setProductStrategy(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productAsk">
                        Product Ask
                    </label>
                    <input
                        id="productAsk"
                        type="number"
                        value={productAsk}
                        onChange={(e) => setProductAsk(e.target.valueAsNumber)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateProject;
