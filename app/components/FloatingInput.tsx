'use client';

import { useState, useEffect } from 'react';

interface FloatingInputProps {
  isVisible: boolean;
  onToggle: () => void;
  currentItems: string[];
  onUpdateItems: (items: string[]) => void;
}

export default function FloatingInput({ isVisible, onToggle, currentItems, onUpdateItems }: FloatingInputProps) {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    if (isVisible) {
      setItems([...currentItems]);
    }
  }, [isVisible, currentItems]);

  const addItem = () => {
    if (newItem.trim() && !items.includes(newItem.trim())) {
      setItems([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    onUpdateItems(items);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  return (
    <>
      {/* Modal Overlay */}
      {isVisible && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-40 p-4">
          <div 
            className="w-full max-w-md rounded-2xl shadow-2xl max-h-96 flex flex-col border-4"
            style={{ backgroundColor: '#371843', borderColor: '#fffd30' }}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-600">
              <h3 className="text-xl font-bold text-white mb-2">
                Customize Your Wheel
              </h3>
              <p className="text-gray-300 text-sm">
                Add or remove items from your spinning wheel
              </p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden flex flex-col">
              {/* Add New Item */}
              <div className="p-4 border-b border-gray-600">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter new item..."
                    className="flex-1 px-3 py-2 rounded-lg border border-gray-500 focus:border-yellow-400 focus:outline-none text-white"
                    style={{ backgroundColor: '#4b2f53' }}
                    maxLength={20}
                  />
                  <button
                    onClick={addItem}
                    disabled={!newItem.trim() || items.includes(newItem.trim())}
                    className="px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ 
                      backgroundColor: '#fffd30',
                      color: '#371843'
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-3">
                <div className="space-y-1">
                  {items.length === 0 ? (
                    <p className="text-gray-400 text-center py-3 text-sm">
                      No items yet. Add some above!
                    </p>
                  ) : (
                    items.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between py-1.5 px-2 rounded text-sm"
                        style={{ backgroundColor: '#4b2f53' }}
                      >
                        <span className="text-white flex-1 truncate text-sm">{item}</span>
                        <button
                          onClick={() => removeItem(index)}
                          className="ml-2 w-4 h-4 rounded-full flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-600 flex gap-3">
              <button
                onClick={onToggle}
                className="flex-1 px-4 py-2 rounded-lg font-semibold border border-gray-500 text-gray-300 hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-2 rounded-lg font-semibold transition-all"
                style={{ 
                  backgroundColor: '#fffd30',
                  color: '#371843'
                }}
              >
                Save ({items.length} items)
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}