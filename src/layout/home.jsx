import React from "react";

function LayoutHome({ children }) {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-2xl font-bold">Tiket</h1>
            </header>
            <main className="flex-1 p-4">
                {children}
            </main>
            <footer className="bg-gray-800 text-white p-4">
                <p>Footer</p>
            </footer>
        </div>
    );
}

export default LayoutHome;