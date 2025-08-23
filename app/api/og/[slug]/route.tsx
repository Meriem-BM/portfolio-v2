import { ImageResponse } from 'next/og';
import { getBlogPost } from '@/lib/blogs/contentManager';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const title = post?.title ?? 'Portfolio';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f0f23',
          backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '40px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: 20,
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 32,
            textAlign: 'center',
            opacity: 0.8,
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          }}
        >
          Meriem Barhoumi
        </div>
        <div
          style={{
            fontSize: 24,
            textAlign: 'center',
            opacity: 0.6,
            marginTop: 20,
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
          }}
        >
          Software Engineer & Web3 Developer
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
