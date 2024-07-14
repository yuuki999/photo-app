'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './styles/MediaList.module.scss';
import { fetchMediaEntries, getSignedUrl, MediaEntry } from './actions/mediaActions';
import { Shimmer } from 'react-shimmer'

const MediaList: React.FC = () => {
  const router = useRouter();
  const [mediaEntries, setMediaEntries] = useState<MediaEntry[]>([]);
  const [mediaUrls, setMediaUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadEntries = async () => {
      setLoading(true);
      try {
        const { entries, error } = await fetchMediaEntries();
        if (error) {
          throw new Error(error);
        }
        setMediaEntries(entries);
        await loadMediaUrls(entries);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadEntries();
  }, []);

  const loadMediaUrls = async (entries: MediaEntry[]) => {
    const urls: Record<string, string> = {};
    for (const entry of entries) {
      const videoUrl = await getSignedUrl(entry.video_path);
      const photoUrl = await getSignedUrl(entry.photo_path);
      if (videoUrl) urls[entry.video_path] = videoUrl;
      if (photoUrl) urls[entry.photo_path] = photoUrl;
    }
    setMediaUrls(urls);
  };

  const filteredEntries = mediaEntries.filter(entry =>
    String(entry.member_id).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const ShimmerMediaItem = () => (
    <div className={styles.mediaItem}>
      <div className={styles.memberIdShimmer}>
        <Shimmer width={200} height={20} />
      </div>
      <div className={styles.dateShimmer}>
        <Shimmer width={150} height={15} />
      </div>
      <div className={styles.mediaContent}>
        <div className={styles.videoShimmer}>
          <Shimmer width={300} height={200} />
        </div>
        <div className={styles.photoShimmer}>
          <Shimmer width={300} height={200} />
        </div>
      </div>
    </div>
  );

  const handleGoBack = () => {
    router.push('/photo');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button onClick={handleGoBack} className={styles.backButton}>
          戻る
        </button>
        <h1 className={styles.title}>メディア一覧</h1>
      </div>
      <input
        type="text"
        placeholder="メンバーIDで検索..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.mediaGrid}>
        {loading
          ? Array(6).fill(0).map((_, index) => <ShimmerMediaItem key={index} />)
          : filteredEntries.map(entry => (
              <div key={entry.id} className={styles.mediaItem}>
                <h2 className={styles.memberId}>メンバーID: {entry.member_id}</h2>
                <p className={styles.date}>
                  アップロード日時: {entry.created_at ? new Date(entry.created_at).toLocaleString() : '記録なし'}
                </p>
                <div className={styles.mediaContent}>
                  {mediaUrls[entry.video_path] ? (
                    <video 
                      src={mediaUrls[entry.video_path]} 
                      controls 
                      className={styles.video}
                    />
                  ) : (
                    <div className={styles.videoShimmer}>
                      <Shimmer width={300} height={200} />
                    </div>
                  )}
                  {mediaUrls[entry.photo_path] ? (
                    <img 
                      src={mediaUrls[entry.photo_path]} 
                      alt={`Photo for ${entry.member_id}`} 
                      className={styles.photo}
                    />
                  ) : (
                    <div className={styles.photoShimmer}>
                      <Shimmer width={300} height={200} />
                    </div>
                  )}
                </div>
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default MediaList;
