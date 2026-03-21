import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-indexnow-secret')
  if (!secret || secret !== process.env.INDEXNOW_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const key = process.env.INDEXNOW_KEY
  if (!key) {
    return NextResponse.json({ error: 'INDEXNOW_KEY not configured' }, { status: 500 })
  }

  let body: { urls: string[] }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!Array.isArray(body.urls) || body.urls.length === 0) {
    return NextResponse.json({ error: 'urls must be a non-empty array' }, { status: 400 })
  }

  const payload = {
    host: 'www.powerbug.fr',
    key,
    keyLocation: `https://www.powerbug.fr/${key}.txt`,
    urlList: body.urls,
  }

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  })

  const text = await response.text()

  return NextResponse.json(
    { status: response.status, message: text || 'OK', urlCount: body.urls.length },
    { status: response.ok ? 200 : response.status }
  )
}
