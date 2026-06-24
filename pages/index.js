import styles from '../styles/Home.module.css';

const sampleDashboard = {
  summary: {
    brandAdjectives: ['authentic', 'practical', 'friendly'],
    positioningSentence: 'The channel feels like a trusted niche resource that helps viewers solve real problems.',
    trustScore: 78,
    nicheScore: 65,
    summaryPhrase: 'Audiences see it as credible and well-tuned for its topic.'
  },
  themes: [
    { theme: 'practical tips', positive: 55, neutral: 30, negative: 15 },
    { theme: 'friendly tone', positive: 40, neutral: 35, negative: 25 },
    { theme: 'expert guidance', positive: 50, neutral: 30, negative: 20 }
  ],
  examples: [
    'This is so helpful — I trust the advice here.',
    'Great niche content for creators looking to grow organically.',
    'The tone feels friendly and practical.'
  ]
};

export default function Home() {
  return (
    <main className={styles.dashboard}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>YouTube Brand AI</p>
          <h1>Channel Brand Dashboard</h1>
          <p className={styles.subtitle}>A skeleton view for brand adjectives, audience perception, and theme analysis.</p>
        </div>
      </header>

      <section className={`${styles.card} ${styles.summaryCard}`}>
        <div>
          <h2>Brand summary</h2>
          <p className={styles.summarySentence}>{sampleDashboard.summary.positioningSentence}</p>
          <div className={styles.adjectives}>
            {sampleDashboard.summary.brandAdjectives.map((adj) => (
              <span key={adj}>{adj}</span>
            ))}
          </div>
        </div>

        <div className={styles.summaryRight}>
          <div className={styles.scoreRow}>
            <div className={styles.scoreCard}>
              <p className={styles.scoreLabel}>Trust</p>
              <p className={styles.scoreValue}>{sampleDashboard.summary.trustScore}</p>
            </div>
            <div className={styles.scoreCard}>
              <p className={styles.scoreLabel}>Niche</p>
              <p className={styles.scoreValue}>{sampleDashboard.summary.nicheScore}</p>
            </div>
          </div>
          <p className={styles.summarySnapshot}>{sampleDashboard.summary.summaryPhrase}</p>
        </div>
      </section>

      <section className={styles.gridSection}>
        <div className={`${styles.card} ${styles.chartCard}`}>
          <h2>Theme sentiment chart</h2>
          <div className={styles.chart}>
            {sampleDashboard.themes.map((item) => (
              <div className={styles.chartRow} key={item.theme}>
                <span>{item.theme}</span>
                <div className={styles.bar}>
                  <span className={styles.barPositive} style={{ width: `${item.positive}%` }} />
                  <span className={styles.barNeutral} style={{ width: `${item.neutral}%` }} />
                  <span className={styles.barNegative} style={{ width: `${item.negative}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className={styles.chartCaption}>Stacked bars show theme frequency and sentiment mix.</p>
        </div>

        <div className={`${styles.card} ${styles.chartCard}`}>
          <h2>Trust vs. niche</h2>
          <div className={styles.pairedBars}>
            <div className={styles.pairedBarsItem}>
              <span>Trust</span>
              <div className={styles.pairedBar}>
                <span style={{ width: `${sampleDashboard.summary.trustScore}%` }} />
              </div>
            </div>
            <div className={styles.pairedBarsItem}>
              <span>Niche</span>
              <div className={styles.pairedBar}>
                <span style={{ width: `${sampleDashboard.summary.nicheScore}%` }} />
              </div>
            </div>
          </div>
          <p className={styles.chartCaption}>A paired bar chart visualizes the two core perception scores.</p>
        </div>
      </section>

      <section className={`${styles.card} ${styles.notesCard}`}>
        <h2>Representative comment snippets</h2>
        <ul>
          {sampleDashboard.examples.map((example) => (
            <li key={example}>{example}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
