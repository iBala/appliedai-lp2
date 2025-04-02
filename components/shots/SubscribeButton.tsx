'use client';

export function SubscribeButton() {
  return (
    <iframe 
      src="https://embeds.beehiiv.com/5cce03e9-64f2-4660-9c8d-c732f0d04486?slim=true" 
      data-test-id="beehiiv-embed" 
      height="52" 
      frameBorder="0" 
      scrolling="no" 
      style={{ 
        margin: 0, 
        borderRadius: '0px !important', 
        backgroundColor: 'transparent',
        width: '100%',
        maxWidth: '400px'  // Added to keep it from getting too wide
      }}
    />
  );
} 