import React from "react";
import { FaRegSadTear } from "react-icons/fa";

const SearchNoFound = () => (
    <div className="flex flex-col items-center justify-center py-16">
        <FaRegSadTear className="text-6xl text-blue-400 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold text-white mb-2">No Rooms Found</h2>
        <p className="text-gray-400 text-center max-w-md">
            Sorry, we couldn't find any rooms matching your search criteria. <br />
            Try adjusting your filters or search again.
        </p>
    </div>
);

export default SearchNoFound;
