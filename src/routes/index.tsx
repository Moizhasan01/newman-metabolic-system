import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { initNewmanSite } from "@/lib/newman-motion";

const TITLE = "The Newman Metabolic System Diet — Allen Newman";
const DESCRIPTION =
  "Get healthy first. The weight follows. Allen Newman's book on feeding your metabolic system real nutrients instead of counting calories.";

export const Route = createFileRoute("/")({
  component: NewmanSite,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "book" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Book",
          name: "The Newman Metabolic System Diet",
          author: { "@type": "Person", name: "Allen Newman" },
          publisher: { "@type": "Organization", name: "Parker Publishers" },
          isbn: "978-1-963654-001-2",
          description: DESCRIPTION,
        }),
      },
    ],
  }),
});

function NewmanSite() {
  useEffect(() => initNewmanSite(), []);

  return (
    <>
      <div className="rail"><i id="rail"></i></div>

      <header id="hdr">
        <a className="mark" href="#top" aria-label="The Newman Metabolic System Diet — top of page">
          <svg viewBox="0 0 40 40" aria-hidden="true">
            <circle cx="20" cy="20" r="18" fill="none" stroke="#5FA0E0" strokeWidth="1.4" />
            <rect x="7.5" y="7.5" width="25" height="25" fill="none" stroke="#6FB94A" strokeWidth="1.2" />
            <circle cx="20" cy="13" r="3.1" fill="#E3C9A6" />
            <path d="M20 16.2v10.4M20 18.4 11 22M20 18.4 29 22M20 26.6l-5.2 7M20 26.6l5.2 7" stroke="#E3C9A6" strokeWidth="1.7" fill="none" strokeLinecap="round" />
          </svg>
          <span className="wordmark">The Newman<br /><b>Metabolic</b> System</span>
        </a>
        <nav>
          <a href="#reframe">The Idea</a>
          <a href="#ballet">The System</a>
          <a href="#vitruvian">Becoming Vitruvian</a>
          <a href="#inside">The Book</a>
          <a href="#allen">Allen</a>
        </nav>
        <a className="btn btn-go btn-sm" href="#buy">Get the Book</a>
      </header>

      <main id="top">

      {/* ══ HERO ══ */}
      <section className="hero">
        <canvas id="water" aria-hidden="true"></canvas>
        <div className="hero-veil" aria-hidden="true"></div>
        <div className="wrap">
          <div className="stack g24">
            <div className="stack g16">
              <p className="eyebrow">Allen Newman &nbsp;·&nbsp; Parker Publishers</p>
              <h1 className="h1">
                <span className="ln"><span>Get healthy</span></span>
                <span className="ln"><span>first. <em>The weight</em></span></span>
                <span className="ln"><span><em>follows.</em></span></span>
              </h1>
              <p className="hero-sub">What if lasting weight loss isn't about eating less, but about giving
                your body more of what it needs? Stop counting calories. Feed your metabolic system
                real nutrients.</p>
            </div>
            <div className="hero-cta">
              <a className="btn btn-go" href="#buy">Get the Book</a>
              <a className="btn btn-ghost" href="#reframe">See how it works</a>
            </div>
            <p className="ribbon">Lose weight while getting healthy</p>
            <p className="scroll-hint"><i></i> Scroll</p>
          </div>
          <div className="cover-stage">
            <div className="cover-tilt" id="tilt">
              <img src="/cover.jpg" width="860" height="1295" alt="Front cover of The Newman Metabolic System Diet by Allen Newman: the Vitruvian Man on parchment above a mountain lake." />
              <img className="cover-refl" src="/cover.jpg" alt="" aria-hidden="true" />
            </div>
            <p className="badge-isbn">ISBN 978-1-963654-001-2</p>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-in">
          <span>Become Vitruvian</span><span>Just add real nutrients</span><span>A twenty-mile marathon</span>
          <span>Feed the system, not the scale</span><span>Become Vitruvian</span><span>Just add real nutrients</span>
          <span>A twenty-mile marathon</span><span>Feed the system, not the scale</span>
        </div>
      </div>

      {/* ══ 2 · THE REFRAME (pinned scrub) ══ */}
      <section className="pin" id="reframe" data-pin="reframe" style={{ height: "280vh" }}>
        <div className="pin-inner pin-center">
          <div className="reframe-grid">
            <div className="stack g16">
              <p className="eyebrow">The reframe</p>
              <p className="swapword" id="swap">
                <span className="a">Count less.</span>
                <span className="b">Feed <em>more.</em></span>
              </p>
              <p className="lede">Every diet you have tried asked you to subtract — fewer calories, smaller
                portions, the foods you like crossed off a list. This one asks you to add. The problem
                isn't only what you eat. It's the real nutrients you're missing.</p>
            </div>
            <div className="gauge">
              <div className="gauge-row">
                <div className="gauge-lab"><span>Calories counted today</span></div>
                <p className="gauge-num" id="calNum">1,847</p>
                <div className="gauge-bar bar-cal"><i id="calBar"></i></div>
              </div>
              <div className="gauge-row">
                <div className="gauge-lab"><span>Real nutrients — metabolic enablers</span></div>
                <p className="gauge-num" id="nutNum">0%</p>
                <div className="gauge-bar bar-nut"><i id="nutBar"></i></div>
              </div>
              <p className="small">The author's reframe: a nutrient is not a number on a label. It is a
                <strong style={{ color: "#DCE7F3" }}>metabolic enabler</strong> — something that lets the system
                do its work.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3 · THE GRAND BALLET (canvas) ══ */}
      <section className="pin" id="ballet" data-pin="ballet" style={{ height: "360vh" }}>
        <div className="pin-inner">
          <canvas id="cells" aria-hidden="true"></canvas>
          <div className="ballet-copy">
            <div className="ballet-box">
              <p className="eyebrow">The grand ballet</p>
              <h2 style={{ fontSize: "clamp(1.9rem,3.6vw,3.1rem)" }}>Thirty trillion cells,<br />all dancing at once.</h2>
              <p>Your metabolic system isn't one thing. It is the sum of roughly thirty trillion cellular
                metabolic systems, each running the same chemistry, all of them at the same time. The book
                calls it a grand ballet — a symphony of life you keep going by feeding it.</p>
              <p className="state-line" id="stateLine">Starved of real nutrients: the dance falls out of step.</p>
            </div>
            <div className="ticks" aria-hidden="true">
              <div className="tickrow" data-at="0"><span>Depleted</span><i></i></div>
              <div className="tickrow" data-at="1"><span>Fed</span><i></i></div>
              <div className="tickrow" data-at="2"><span>In sync</span><i></i></div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4 · ENABLERS vs BLOCKERS ══ */}
      <section className="band band-deep">
        <div className="wrap stack g36">
          <div className="stack g16" data-reveal="">
            <p className="eyebrow">Enablers &amp; blockers</p>
            <h2>Two kinds of food go<br />into the same body.</h2>
            <p className="lede">The book's central distinction, kept at the level of an idea rather than a
              prescription. One kind lets the system run. The other gives it very little to run on.</p>
          </div>
          <div className="split" data-reveal="">
            <div className="panel p-en">
              <h3>Metabolic enablers</h3>
              <ul>
                <li><span className="dot"></span><span>Real, nature-made nutrients in the form your cells already recognise.</span></li>
                <li><span className="dot"></span><span>Whole foods eaten close to how they grew.</span></li>
                <li><span className="dot"></span><span>Variety, because no single food carries everything.</span></li>
                <li><span className="dot"></span><span>Added to the plate, not subtracted from it — nothing is forbidden.</span></li>
              </ul>
            </div>
            <div className="panel p-bl">
              <h3>Metabolic blockers</h3>
              <ul>
                <li><span className="dot"></span><span>Ultra-processed food: high in calories, thin on the nutrients the system needs.</span></li>
                <li><span className="dot"></span><span>Eating patterns built around convenience rather than nourishment.</span></li>
                <li><span className="dot"></span><span>Years of restriction that taught the body to expect scarcity.</span></li>
                <li><span className="dot"></span><span>The habit of asking "how many calories?" before "what's actually in this?"</span></li>
              </ul>
            </div>
          </div>
          <p className="small" data-reveal="">Allen Newman's framing, drawn from the book. It describes how he thinks about
            food — not a treatment, and not a claim about any illness.</p>
        </div>
      </section>

      {/* ══ 5 · BECOMING VITRUVIAN ══ */}
      <section className="band band-light" id="vitruvian">
        <div className="wrap vit">
          <div className="vit-stage" id="vitStage">
            <svg className="vit-svg" viewBox="0 0 200 200" aria-hidden="true">
              <circle className="draw" cx="100" cy="100" r="88" style={{ "--len": 553 } as React.CSSProperties} />
              <rect className="draw" x="24" y="30" width="152" height="152" style={{ "--len": 608 } as React.CSSProperties} />
              <path className="draw thin" d="M100 12v176M12 100h176M38 38l124 124M162 38 38 162" style={{ "--len": 1180 } as React.CSSProperties} />
            </svg>
            <img src="/vitruvian.jpg" width="600" height="728" alt="The Vitruvian Man illustration from the book cover, drawn in sepia line art on parchment inside a circle and a square." />
            <svg className="ringtext" viewBox="0 0 200 200" aria-hidden="true">
              <defs><path id="ring" d="M100,100 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0" /></defs>
              <text><textPath href="#ring" startOffset="0">
                Becoming Vitruvian · Just add real nutrients · Becoming Vitruvian · Just add real nutrients ·
              </textPath></text>
            </svg>
          </div>
          <div className="stack g16" data-reveal="">
            <p className="eyebrow">The book's own throughline</p>
            <h2>Becoming Vitruvian.</h2>
            <p className="lede">Leonardo's figure isn't a before-and-after photograph. It's a study of
              proportion — a person drawn in right relation to themselves.</p>
            <p className="lede">That is what the book means by <em>becoming</em> Vitruvian: physical and mental
              fitness as something you move toward, at your own pace, over years rather than weeks. Not a
              transformation you post. A relationship with your own body that you keep.</p>
            <p className="ribbon" style={{ marginTop: ".6rem" }}>First feed your metabolic system, then your taste buds</p>
          </div>
        </div>
      </section>

      {/* ══ 6 · THE MARATHON (horizontal scrub) ══ */}
      <section className="pin" data-pin="marathon" style={{ height: "340vh" }}>
        <div className="pin-inner" style={{ display: "grid", alignContent: "center" }}>
          <div className="htrack" id="htrack">
            <div className="hcard lead">
              <p className="eyebrow">The pace</p>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3.4rem)" }}>A twenty-mile<br />marathon, not a<br />hundred-yard dash.</h2>
              <p className="lede" style={{ fontSize: "1.02rem" }}>The book is explicit about this. Nothing here is
                designed to be finished in thirty days. Here is what the journey actually asks of you.</p>
            </div>
            <div className="hcard"><p className="mile">01</p><p className="step">Week one</p>
              <h3>Get a pencil and a small notebook.</h3>
              <p>Not an app. The book asks you to write down what you actually eat, in your own hand,
                and title the pages. Before you change anything, you look at it.</p></div>
            <div className="hcard"><p className="mile">02</p><p className="step">The first months</p>
              <h3>Add before you subtract.</h3>
              <p>Real nutrients go onto the plate first. Nothing is banned. The book's argument is that
                crowding in what's missing does more than policing what's already there.</p></div>
            <div className="hcard"><p className="mile">03</p><p className="step">The long middle</p>
              <h3>Learn, plan, adjust.</h3>
              <p>You read labels differently. You notice what's in things. You change one habit and
                keep it, then change another. This is the part every crash diet skips.</p></div>
            <div className="hcard"><p className="mile">04</p><p className="step">Year one and beyond</p>
              <h3>Health first — the weight follows.</h3>
              <p>The order matters, and it's the whole thesis. Newman's position is that a well-fed
                system is the goal, and that a lighter, more confident you comes along behind it.</p></div>
            <div className="hcard" style={{ borderColor: "rgba(111,185,74,.4)", background: "linear-gradient(180deg,#0d3117,#08203A)" }}>
              <p className="mile" style={{ color: "rgba(111,185,74,.28)" }}>05</p><p className="step">The whole method</p>
              <h3>It's all in the book.</h3>
              <p>The full plan, the reasoning behind it, and thirty years of one man's reading and
                self-experiment.</p>
              <a className="btn btn-go" href="#buy" style={{ marginTop: ".5rem" }}>Get the Book</a></div>
          </div>
        </div>
      </section>

      {/* ══ 7 · CEO ══ */}
      <section className="band band-deep">
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem", maxWidth: "min(880px,92vw)" }}>
          <div className="stack g16" data-reveal="">
            <p className="eyebrow">Chapter concept</p>
            <h2>You are the CEO of your body.</h2>
            <p className="lede">A city budgets for its own maintenance — roads, water, power — long before
              anything breaks. The book asks you to run your body the same way: as the person in charge,
              with a budget, a plan, and the authority to change it.</p>
            <p className="lede">Being the CEO means learning enough to make your own informed choices, and
              then actually making them. It does not mean going it alone.</p>
          </div>
        </div>
      </section>

      {/* ══ 8 · WHAT'S INSIDE ══ */}
      <section className="band band-light" id="inside">
        <div className="wrap stack g36">
          <div className="stack g16" data-reveal="">
            <p className="eyebrow">What's inside</p>
            <h2>The argument, in order.</h2>
            <p className="lede">The book builds one idea at a time. Read straight through, it goes like this.</p>
          </div>
          <div className="chapters" data-reveal="">
            <div className="chap"><span className="n">01</span><span className="t">The metabolic system, explained simply</span><span className="d">What it is, and why it isn't the same thing as metabolism-as-a-number</span></div>
            <div className="chap"><span className="n">02</span><span className="t">Real nutrients versus ultra-processed food</span><span className="d">The reframed definition of a nutrient</span></div>
            <div className="chap"><span className="n">03</span><span className="t">Why diets fail — and the three hidden enemies</span><span className="d">What restriction actually teaches the body</span></div>
            <div className="chap"><span className="n">04</span><span className="t">Source makes a difference</span><span className="d">Man-made, organic, and nature-made, side by side</span></div>
            <div className="chap"><span className="n">05</span><span className="t">You are the CEO</span><span className="d">Budgeting for your own maintenance</span></div>
            <div className="chap"><span className="n">06</span><span className="t">The diet plan</span><span className="d">The pencil, the notebook, and the method</span></div>
            <div className="chap"><span className="n">07</span><span className="t">The journey — becoming Vitruvian</span><span className="d">Pace, patience, and what to expect of yourself</span></div>
          </div>
          <div className="source" data-reveal="">
            <img src="/algae.jpg" width="300" height="293" alt="Blue-green algae cells photographed under a microscope, as shown on the book's back cover." />
            <div className="stack g10">
              <p className="eyebrow" style={{ color: "var(--algae)" }}>Inside the book</p>
              <h3 style={{ color: "#fff" }}>Where the nutrients come from</h3>
              <p style={{ color: "#C6D7E9" }}>The cover names it, and the book explains it properly: Klamath Lake
                blue-green algae (KLBGA), presented as a convenient source of naturally occurring nutrients.
                Newman treats it as one answer to a question the book spends its first half asking — not as
                a product, and not as a shortcut. This site does not sell supplements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 9 · ENDORSEMENTS ══ */}
      <section className="band band-deep">
        <div className="wrap stack g36">
          <p className="eyebrow" data-reveal="">What readers are saying</p>
          <div className="quotes">
            <figure className="quote" data-reveal="">
              <blockquote>"Allen, you are on the right track. Your metabolic system makes sense and is
                supported by thousands of pages of research."</blockquote>
              <cite>Printed on the back cover</cite>
            </figure>
            <figure className="quote" data-reveal="">
              <blockquote>"The Newman Metabolic System Diet book simplifies our understanding in
                differentiating between man-made, organic, and real, God-made sources of nutrition.
                Laziness leads to the use of dead foods, which leads to chronic diseases. A little work,
                an open mind, and a thirst for the truth will lead to the healthiest you."</blockquote>
              <cite>Royce G. Newman, D.C.</cite>
            </figure>
          </div>
        </div>
      </section>

      {/* ══ 10 · BUY DIRECT ══ */}
      <section className="band" id="buy" style={{ background: "linear-gradient(180deg,#04101F,#072a16 55%,#04101F)" }}>
        <div className="wrap buy">
          <div className="buy-cover" data-reveal="">
            <img src="/cover.jpg" width="860" height="1295" alt="The Newman Metabolic System Diet — front cover." />
          </div>
          <div className="stack g24" data-reveal="">
            <div className="stack g10">
              <p className="eyebrow">Order direct from the author</p>
              <h2>Get the book.</h2>
              <p className="lede">Buying here supports Allen directly rather than a retailer's margin.</p>
            </div>

            <form className="formats" id="fmtForm">
              <label className="fmt">
                <input type="radio" name="fmt" value="hardcover" data-price="29.95" />
                <span className="pip" aria-hidden="true"></span>
                <span><span className="nm">Hardcover</span><br /><span className="sub">Case bound · full-colour jacket</span></span>
                <span className="pr">$29.95</span>
              </label>
              <label className="fmt">
                <input type="radio" name="fmt" value="paperback" data-price="19.95" defaultChecked />
                <span className="pip" aria-hidden="true"></span>
                <span><span className="nm">Paperback</span><br /><span className="sub">The reading copy — most popular</span></span>
                <span className="pr">$19.95</span>
              </label>
              <label className="fmt">
                <input type="radio" name="fmt" value="signed" data-price="39.95" />
                <span className="pip" aria-hidden="true"></span>
                <span><span className="nm">Signed hardcover</span><br /><span className="sub">Inscribed by Allen Newman</span></span>
                <span className="pr">$39.95</span>
              </label>
              <label className="fmt">
                <input type="radio" name="fmt" value="ebook" data-price="9.99" />
                <span className="pip" aria-hidden="true"></span>
                <span><span className="nm">eBook</span><br /><span className="sub">EPUB and Kindle · instant download</span></span>
                <span className="pr">$9.99</span>
              </label>
            </form>

            <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", flexWrap: "wrap" }}>
              <div className="qty" role="group" aria-label="Quantity">
                <button type="button" id="qMinus" aria-label="Decrease quantity">&minus;</button>
                <output id="qVal" aria-live="polite">1</output>
                <button type="button" id="qPlus" aria-label="Increase quantity">+</button>
              </div>
              <p className="small" id="shipNote">Ships free in the US on orders of 2 or more.</p>
            </div>

            <div className="total-row">
              <span className="lab">Total</span>
              <span className="val" id="total">$19.95</span>
            </div>

            <a className="btn btn-go" id="checkout" href="#" style={{ width: "100%", paddingBlock: "1.15rem", fontSize: "1.08rem" }}>
              Checkout &nbsp;·&nbsp; <span id="ctaTotal">$19.95</span>
            </a>

            <div className="trust">
              <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 3v6c0 4.4-3 8.2-7 9-4-.8-7-4.6-7-9V6z" /></svg> Secure checkout</span>
              <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h13v10H3zM16 10h3l2 3v4h-5z" /><circle cx="7" cy="18" r="1.6" /><circle cx="18" cy="18" r="1.6" /></svg> Ships worldwide</span>
              <span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12l5 5L20 6" /></svg> 30-day returns</span>
            </div>

            <div className="retail">
              <p className="small" style={{ width: "100%", marginBottom: "-.3rem" }}>Prefer a retailer?</p>
              <a className="btn btn-ghost btn-sm" href="#" data-retailer="" target="_blank" rel="noopener">Amazon</a>
              <a className="btn btn-ghost btn-sm" href="#" data-retailer="" target="_blank" rel="noopener">Barnes &amp; Noble</a>
              <a className="btn btn-ghost btn-sm" href="#" data-retailer="" target="_blank" rel="noopener">Bookshop.org</a>
            </div>

            <p className="cfg-note"><strong style={{ color: "#DCE7F3" }}>Before launch:</strong> prices, the checkout
              link and the retailer links are placeholders. Set them in one place — the <code>CONFIG</code>
              block at the top of this page's script. Point <code>checkoutUrl</code> at a Stripe Payment
              Link, Shopify cart, or Lemon Squeezy checkout and the button below is live.</p>
          </div>
        </div>
      </section>

      {/* ══ 11 · ALLEN ══ */}
      <section className="band band-deep" id="allen">
        <div className="wrap author">
          <div className="portrait" data-reveal="">
            <svg width="52" height="52" viewBox="0 0 40 40" aria-hidden="true">
              <circle cx="20" cy="20" r="18" fill="none" stroke="#5FA0E0" strokeWidth="1.2" />
              <circle cx="20" cy="15" r="5" fill="none" stroke="#E3C9A6" strokeWidth="1.4" />
              <path d="M9 32c2.4-5.4 6.5-8 11-8s8.6 2.6 11 8" fill="none" stroke="#E3C9A6" strokeWidth="1.4" />
            </svg>
            <p className="ph">Author photograph<br />to be supplied</p>
          </div>
          <div className="stack g16" data-reveal="">
            <p className="eyebrow">About the author</p>
            <h2>Thirty years of research.<br />One man's body as the<br />only laboratory.</h2>
            <p className="lede">Allen Newman is not a doctor and does not present himself as one. He is a
              lifelong self-experimenter who spent fifteen years arriving at his own definition of a
              nutrient, prompted by his mother's nutrition tapes, a brother who kept sending him
              information, and a nutrition group where he first met blue-green algae.</p>
            <p className="lede">He wrote the book after watching his wife's diets fail, one after another, for
              reasons that had nothing to do with willpower. What he offers is a philosophy and a personal
              method — memoir and manifesto, not a clinical protocol.</p>
            <div className="hero-cta" style={{ marginTop: ".5rem" }}>
              <a className="btn btn-go" href="#buy">Get the Book</a>
              <a className="btn btn-ghost" href="#guide">Read the free guide</a>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 12 · LEAD MAGNET ══ */}
      <section className="band" id="guide" style={{ background: "linear-gradient(160deg,#0b2a06,#0c3a14 45%,#04101F)" }}>
        <div className="wrap signup">
          <div className="stack g16" data-reveal="">
            <p className="eyebrow" style={{ color: "var(--cta-hi)" }}>Free guide</p>
            <h2>The Marathon Mindset</h2>
            <p className="lede" style={{ color: "#D3E4D2" }}>Seven reasons diets fail — and what to do instead.
              A short, plain read. No purchase, no catch.</p>
            <ul className="magnet-list">
              <li><span className="dot"></span><span>Why the subtraction habit backfires</span></li>
              <li><span className="dot"></span><span>The question to ask before "how many calories?"</span></li>
              <li><span className="dot"></span><span>How to set a pace you can actually hold</span></li>
              <li><span className="dot"></span><span>The pencil-and-notebook exercise from chapter six</span></li>
            </ul>
          </div>
          <form className="stack g10" id="signupForm" data-reveal="" style={{ background: "rgba(4,16,31,.55)", padding: "clamp(1.5rem,3vw,2.2rem)", border: "1px solid rgba(111,185,74,.3)" }}>
            <label className="small" htmlFor="em" style={{ color: "#C6D7E9" }}>Where should we send it?</label>
            <div className="field">
              <input id="em" type="email" name="email" placeholder="you@example.com" required autocomplete="email" />
              <button className="btn btn-go" type="submit">Send me the guide</button>
            </div>
            <p className="small" id="signupMsg">One email with the guide, then the occasional note from Allen.
              Unsubscribe any time.</p>
          </form>
        </div>
      </section>

      </main>

      <footer>
        <div className="wrap">
          <div className="foot-top">
            <div className="stack g16">
              <span className="mark">
                <svg viewBox="0 0 40 40" aria-hidden="true" width="30" height="30">
                  <circle cx="20" cy="20" r="18" fill="none" stroke="#5FA0E0" strokeWidth="1.4" />
                  <rect x="7.5" y="7.5" width="25" height="25" fill="none" stroke="#6FB94A" strokeWidth="1.2" />
                  <circle cx="20" cy="13" r="3.1" fill="#E3C9A6" />
                  <path d="M20 16.2v10.4M20 18.4 11 22M20 18.4 29 22M20 26.6l-5.2 7M20 26.6l5.2 7" stroke="#E3C9A6" strokeWidth="1.7" fill="none" strokeLinecap="round" />
                </svg>
                <span className="wordmark">The Newman<br /><b>Metabolic</b> System Diet</span>
              </span>
              <p className="ribbon" style={{ fontSize: "1rem", padding: ".45rem 1.8rem" }}>Lose weight while getting healthy</p>
              <div className="socials">
                <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c0 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2 0-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c0-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2zm0 3.2A6.6 6.6 0 1 0 18.6 12 6.6 6.6 0 0 0 12 5.4zm0 10.9A4.3 4.3 0 1 1 16.3 12 4.3 4.3 0 0 1 12 16.3zm6.9-11.1a1.55 1.55 0 1 1-1.55-1.55A1.55 1.55 0 0 1 18.9 5.2z" /></svg></a>
                <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M13.5 22v-8h2.7l.4-3.1h-3.1V8.9c0-.9.25-1.5 1.55-1.5h1.65V4.6A22 22 0 0 0 14.3 4.5c-2.4 0-4 1.45-4 4.1v2.3H7.6V14h2.7v8z" /></svg></a>
                <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M4.98 3.5A2.5 2.5 0 1 1 2.5 6 2.5 2.5 0 0 1 4.98 3.5zM3 8.9h4V21H3zM9.5 8.9h3.8v1.65h.05a4.2 4.2 0 0 1 3.78-2.07c4 0 4.77 2.63 4.77 6.05V21h-4v-5.5c0-1.3 0-3-1.83-3s-2.12 1.43-2.12 2.9V21h-4z" /></svg></a>
                <a href="#" aria-label="YouTube"><svg viewBox="0 0 24 24"><path d="M23 12s0-3.4-.43-5a2.77 2.77 0 0 0-1.95-2C18.88 4.5 12 4.5 12 4.5s-6.88 0-8.62.46a2.77 2.77 0 0 0-1.95 2C1 8.6 1 12 1 12s0 3.4.43 5a2.77 2.77 0 0 0 1.95 2c1.74.47 8.62.47 8.62.47s6.88 0 8.62-.47a2.77 2.77 0 0 0 1.95-2C23 15.4 23 12 23 12zM9.75 15.35v-6.7L15.5 12z" /></svg></a>
              </div>
            </div>
            <div>
              <p className="foot-h">The book</p>
              <div className="foot-nav">
                <a href="#reframe">The idea</a><a href="#ballet">The metabolic system</a>
                <a href="#vitruvian">Becoming Vitruvian</a><a href="#inside">What's inside</a>
                <a href="#buy">Get the book</a>
              </div>
            </div>
            <div>
              <p className="foot-h">More</p>
              <div className="foot-nav">
                <a href="#allen">About Allen Newman</a><a href="#guide">Free guide</a>
                <a href="#buy">Press &amp; media enquiries</a>
                <a href="#top">Back to top</a>
              </div>
            </div>
          </div>
          <p className="disclaimer">This book and website reflect the personal views, experience and research
            of the author. They are for general informational purposes only, are not medical advice, and
            are not intended to diagnose, treat, cure or prevent any disease. Consult a qualified physician
            before changing your diet, and do not change or stop any prescribed treatment without your
            doctor's guidance. Individual experiences vary.</p>
          <div className="foot-end">
            <span>© <span id="yr">2026</span> Allen Newman. Published by Parker Publishers.</span>
            <span>ISBN 978-1-963654-001-2</span>
          </div>
        </div>
      </footer>
    </>
  );
}
