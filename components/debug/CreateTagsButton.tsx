"use client"

interface CreateTagsButtonProps {
  className?: string;
}

export default function CreateTagsButton({ className }: CreateTagsButtonProps) {
  const handleCreateTags = async () => {
    try {
      const response = await fetch('/api/debug/create-sample-tags', { method: 'POST' });
      const data = await response.json();
      
      if (data.success) {
        alert('Sample tags created successfully!');
        window.location.reload();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      alert('Error: ' + (err as Error).message);
    }
  };

  return (
    <button
      onClick={handleCreateTags}
      className={className || "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"}
    >
      Create Sample Tags & Mappings
    </button>
  );
} 