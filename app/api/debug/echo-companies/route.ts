import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('DEBUG API: Echoing companies API response');
    
    // Fetch from the internal API directly to see what's returned
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/companies`);
    const rawData = await response.text(); // Get raw text first for debugging
    
    console.log('DEBUG API: Raw response from companies API:', rawData);
    
    let jsonData;
    try {
      jsonData = JSON.parse(rawData);
      console.log('DEBUG API: Parsed JSON:', typeof jsonData, Array.isArray(jsonData.companies));
      console.log('DEBUG API: Companies count:', jsonData.companies?.length || 0);
    } catch (parseError) {
      console.error('DEBUG API: JSON parse error:', parseError);
      jsonData = { parseError: 'Failed to parse JSON', raw: rawData };
    }
    
    return NextResponse.json({
      debug: {
        apiUrl: `${baseUrl}/api/companies`,
        rawLength: rawData.length,
        rawPreview: rawData.slice(0, 100) + '...',
        parsedType: typeof jsonData,
        hasCompaniesKey: 'companies' in jsonData,
        companiesIsArray: Array.isArray(jsonData.companies),
        companiesCount: jsonData.companies?.length || 0
      },
      data: jsonData
    });
  } catch (error) {
    console.error('DEBUG API ERROR:', error);
    return NextResponse.json({ 
      error: 'Failed to echo companies response',
      details: error
    }, { status: 500 });
  }
} 