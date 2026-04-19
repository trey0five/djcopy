// Work samples. Content comes from real deliverables, lightly trimmed for the
// on-site preview. Each project declares a `layout` key that maps to a bespoke
// overlay component in src/projects/.

export const projects = [
  {
    id: 'email-funnel',
    layout: 'EmailFunnel',
    tag: 'Email Funnel',
    title: '3-Step Bootcamp Warmup',
    client: 'High-Ticket Sales Bootcamp',
    blurb: 'Welcome → Relatability → Scarcity. A warmup sequence that books calls without sounding like every other coach in the DMs.',
    palette: { bg: '#0EA5E9', accent: '#FDE68A' },
    preview: [
      { subject: "You're now plugged into the free sauce 💪", from: 'Aiden', tag: 'welcome' },
      { subject: "You're not failing… you're just missing this.", from: 'Aiden', tag: 'pain' },
      { subject: 'Last chance to grab your free Bootcamp spot', from: 'Aiden', tag: 'cta' }
    ],
    data: {
      emails: [
        {
          subject: "You're now plugged into the free sauce 💪",
          altSubjects: [
            "Welcome to the bootcamp, here's what's coming your way",
            'This is how we build high-ticket winners 🚀'
          ],
          header: "You're here because you want to level up. Now let's make sure you actually do.",
          body: `Hey [First Name],

Appreciate you joining the High Ticket Sales Bootcamp. I built this to help closers like you actually see what it takes to break out of that "stuck" stage and start stacking wins consistently.

No fluff. No recycled YouTube tactics. Just strategies I've used to hit 5-figure months while helping others do the same.

Over the next few days, I'll send you a few quick wins you can plug in immediately — small shifts that make a big difference in your close rate.

If you want to skip ahead and see what working with me looks like, you can book a quick strategy call here 👇`,
          cta: 'Book a Free Call →',
          signoff: 'Stay sharp,\nAiden'
        },
        {
          subject: "You're not failing… you're just missing this.",
          altSubjects: [
            'Why most new closers never make it past $3k/mo',
            "You're closer than you think, here's what's missing"
          ],
          header: "Most people don't fail because they lack effort, they fail because they're closing wrong.",
          body: `Real talk — I used to grind 10+ hours a day trying to "get better at sales," watching every video and script out there.

But what I didn't realize? The reason I wasn't closing deals wasn't about effort… it was about structure.

Once I learned how to frame calls, qualify better, and use actual systems (not hype), everything changed.

That's what we cover in the Bootcamp, and honestly, once you see how the process works, it's hard to unsee it.

If you're serious about turning those "almost" calls into actual closes, I can walk you through it on a quick 10-minute breakdown.`,
          cta: 'Book a Free Strategy Call →',
          signoff: "Let's get you closing like a pro,\nAiden"
        },
        {
          subject: 'Last chance to grab your free Bootcamp spot',
          altSubjects: [
            "You're gonna want to see this before it closes…",
            "We're almost full — don't miss out"
          ],
          header: "Most people overthink their next move, and that's exactly why they stay stuck.",
          body: `I'm wrapping up enrollments for the High Ticket Sales Bootcamp, and I don't want you to miss this round.

I'll be breaking down:
• How to find profitable offers that actually pay 💸
• The exact DM and call scripts that close clients faster
• And how to scale once you start hitting consistent wins

You've got the drive — all you need now is the framework.

Book a quick strategy call before spots close and I'll help you map your next move.`,
          cta: 'Book Your Free Call →',
          signoff: 'See you inside,\nAiden'
        }
      ]
    }
  },
  {
    id: 'followup-system',
    layout: 'FollowUpSystem',
    tag: 'Automation',
    title: 'Booked → Closed Flow',
    client: 'Coverage Consult',
    blurb: 'An end-to-end DM + booking automation that pre-qualifies, filters ghosts, and only hands hot leads to a human.',
    palette: { bg: '#10B981', accent: '#FCA5A5' },
    preview: [
      'Booked Consult',
      'Inbound DM',
      'Filter Layer',
      'Post-Call Loop'
    ],
    data: {
      flows: [
        {
          title: 'Booked Consult',
          kind: 'trigger',
          trigger: 'User books via Calendly link in bio',
          steps: [
            'Instant confirmation message',
            '24-hr reminder + pre-frame ("Here\'s what to prep")',
            '1-hr text reminder with reschedule CTA'
          ]
        },
        {
          title: 'Inbound DM',
          kind: 'trigger',
          trigger: '"DM me" CTA from Reel / Post',
          steps: [
            'Ask: self-employed or looking for better personal coverage?',
            'Route by reply → tailored qualifying questions',
            'Auto-prequalify by state, current coverage, monthly cost',
            'Qualified → send booking link',
            'Unqualified → polite redirect'
          ]
        },
        {
          title: 'Filter Layer',
          kind: 'filter',
          trigger: 'Only high-fit leads escalate',
          steps: [
            'Out-of-state leads blocked',
            'Low-intent responses deprioritized',
            'Price-shoppers filtered out'
          ]
        },
        {
          title: 'Post-Call Loop',
          kind: 'followup',
          trigger: 'After the consult',
          steps: [
            'No-show → 1-hr gentle nudge to reschedule',
            '24-hr recap + next step',
            '3-day + 7-day value-based check-ins',
            'Reply "READY" to restart the flow'
          ]
        }
      ]
    }
  },
  {
    id: 'outreach',
    layout: 'Outreach',
    tag: 'Cold Outreach',
    title: 'Kishigallery Video Pitch',
    client: 'Kishigallery',
    blurb: 'A two-touch outreach sequence that opens the door without sounding like cold spam.',
    palette: { bg: '#BE185D', accent: '#F0ABFC' },
    preview: ['Initial pitch', '3–5 day follow-up'],
    data: {
      emails: [
        {
          label: 'Initial Outreach',
          subjects: [
            'Turn your raw footage into scroll-stopping edits',
            'Want videos that keep people watching?',
            'Your content deserves cinematic editing',
            "Let's make your brand unforgettable on screen"
          ],
          header: 'Transforming Your Ideas Into Stunning Video Edits',
          body: `Hi [First Name],

Hope your week's going well! I wanted to quickly introduce you to Kishigallery — we specialize in turning raw footage into polished, professional edits that stand out online.

Whether it's social media promos, brand storytelling, or event recaps, our goal is simple: make your video content unforgettable and keep your audience engaged from the first second to the last.

We've worked with creators and brands who wanted their content to feel premium without losing authenticity — and that's exactly what we deliver.

If you've been looking for a way to boost your content quality (without spending hours editing yourself), we'd love to help.`,
          cta: "Let's Talk About Your Next Video",
          ctaSub: 'Quick 10-min chat — no pressure, just ideas.',
          signoff: "Can't wait to see what we could create together.\nThe Kishigallery Team"
        },
        {
          label: 'Follow-Up (3–5 days)',
          subjects: [
            'Just checking in — did you see this?',
            'Still interested in video edits that wow?',
            'A quick idea for your next project',
            'Should I close the loop on this?'
          ],
          header: "Don't Let Great Footage Go to Waste",
          body: `Hey [First Name],

Just wanted to circle back on my last email — I know things get busy.

If you've got raw clips, event footage, or even existing content that needs a creative refresh, Kishigallery can step in and handle the edits for you. That way, you get scroll-stopping videos without burning hours in front of editing software.

Even if you're not ready to start today, I'd be happy to share a few editing ideas or style directions tailored to your brand so you can see what's possible.`,
          cta: 'Start Winning With Better Video',
          ctaSub: "Your audience is waiting — let's make something that grabs their attention.",
          signoff: 'Appreciate your time either way!\nThe Kishigallery Team'
        }
      ]
    }
  },
  {
    id: 'lead-conversion',
    layout: 'LeadConversion',
    tag: 'Systems',
    title: 'Lead Conversion Blueprint',
    client: 'Agency Services',
    blurb: 'Two proven backend stacks that turn interest into action — without chasing leads manually.',
    palette: { bg: '#7C3AED', accent: '#A7F3D0' },
    preview: ['Option 1: Automated Sequence', 'Option 2: Full CRM + Funnel'],
    data: {
      core: [
        { title: 'Warm Lead Tracking', copy: 'Spot followers / viewers already engaged and most likely to buy.' },
        { title: 'Auto-Triggered DM or Email Sequences', copy: 'Messages fire based on behavior — clicks, story replies, form fills.' },
        { title: 'Content Script Writing', copy: 'Templates plugged into your brand voice so content stays aligned with offers.' },
        { title: 'Custom CRM Dashboards', copy: "Visual views of who's hot, who needs nurturing, and what's next." }
      ],
      options: [
        {
          label: 'Option 1',
          name: 'Automated Email / DM Sequence System',
          best: 'Brands with consistent traffic who need a clearer way to qualify and convert without heavy manual follow-up.',
          includes: [
            'Plug-and-play automation that responds to lead behavior',
            'Engagement-based follow-up scripts (email or DMs)',
            'Warm audience reactivation templates',
            'Simple backend that pings your team when leads are hot'
          ],
          tags: ['Low-lift', 'Great for scaling conversions', 'Keeps you out of the DMs']
        },
        {
          label: 'Option 2',
          name: 'Full CRM + Funnel System',
          best: 'Brands with teams or growing operations that need full visibility and hands-off scaling.',
          includes: [
            'Custom CRM pipeline built around your current offer flow',
            'Visual lead qualification dashboards',
            'Tags & triggers for story replies, quiz opt-ins, abandoned checkouts, etc.',
            'Integration with your email platform and DM tools',
            'Content strategy plugged directly into the funnel'
          ],
          tags: ['Ideal for scaling', 'Team-ready', 'High-leverage backend']
        }
      ]
    }
  },
  {
    id: 'crm-structure',
    layout: 'CRMStructure',
    tag: 'CRM',
    title: 'Melanie\u2019s Creator CRM',
    client: 'Melanie — Travel Creator',
    blurb: 'A lightweight CRM for a creator running DM-based sales: lead tracker, script log, weekly pipeline, automations.',
    palette: { bg: '#DC2626', accent: '#FEF3C7' },
    preview: ['Lead Tracker', 'DM / Story Log', 'Weekly Pipeline', 'Automations'],
    data: {
      leads: [
        { name: 'Jessica M', handle: '@jess_mindset', via: 'DM', source: '"Let\'s Go" Story', level: 'Warm', optin: 'Yes (Free Guide)', added: 'Dec 5', followup: 'Dec 7', status: 'Awaiting Reply' },
        { name: 'Michael T', handle: '@mikefromatl', via: 'Link in Bio', source: 'Bio Reel', level: 'Cold', optin: 'No', added: 'Dec 4', followup: 'Dec 9', status: 'Needs Nurture' }
      ],
      scripts: [
        { date: 'Dec 5', platform: 'IG Story', script: '"Want to learn how I travel full time" (Poll CTA)', result: '42 clicks', notes: 'Best performing story this week' },
        { date: 'Dec 6', platform: 'DM', script: '"Hey saw you voted on my poll, here\'s that free 3-step roadmap"', result: 'Sent', notes: 'Added to warm leads' }
      ],
      pipeline: [
        { label: 'New Leads', value: 18, suffix: '' },
        { label: 'Warm', value: 7, suffix: '' },
        { label: 'Booked Calls', value: 4, suffix: '' },
        { label: 'Closed Sales', value: 2, suffix: '' },
        { label: 'Revenue', value: 1400, suffix: '$', prefix: true }
      ],
      automations: [
        'Auto-add Calendly bookings to CRM via Zapier',
        'Send IG Story responders straight to email list',
        'Alert when a warm lead is untouched 3+ days',
        'Tag interest level from DM keywords'
      ]
    }
  }
]
