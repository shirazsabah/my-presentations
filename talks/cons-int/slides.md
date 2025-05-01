---
theme: default
background: /rnoh.png
class: text-center
title: The challenges of delivering a revision arthroplasty service
transition: slide-left
mdc: true
info: false
author: Shiraz Sabah
presenter: true
download: true
highlighter: shiki
lineNumbers: false
monaco: true
monacoTypesSource: local
selectable: true
#aspectRatio: 16/9
themeConfig:
  primary: '97999c'
fonts:
  sans: Roboto
  serif: Roboto Slab
  mono: Fira Code
drawings:
  enabled: true
  persist: false
  presenterOnly: false
  syncAll: true
css: unocss
glowSeed: 1
---

<h1 style="background-color: black; opacity: 0.7"> The challenges of delivering a revision arthroplasty service </h1>

<h2> <span style="background-color: black; opacity: 0.7" v-mark.red="0">and how I can help</span> </h2>

<br>
<br>

<h2> <span style="background-color: black; opacity: 0.5">Shiraz Sabah</span> </h2>

<!--
Thank you for inviting me to interview, and for accommodating me remotely.

You've asked me to talk about the challenges of delivering a revision arthroplasty service.

I appreciate that I am speaking with an educated audience and my objective today is to share my perspectives on these challenges and the solutions I can offer if appointed.
-->

---

## Challenges

<v-clicks>

- Delivering an <span v-mark.red="1">effective</span> patient pathway

    - achieving <span v-mark.indigo="2">excellent</span> patient-relevant outcomes,

    - within <span v-mark.green="3">budget</span>,

    - <span v-mark.blue="4">efficiently</span>, alongside <span v-mark.purple="4">high-volume, low-complexity work</span>,

    - <span v-mark.yellow="5">training</span> doctors, physiotherapists, nurses, administrators ...

    - furthering RNOH’s <span v-mark.orange="6">values</span>

</v-clicks>

<!--
So, what are the challenges?

I'm going to spend very little time defining the problem, because you all know this already: revision surgery can be simple or complex; patient populations are heterogenous, and often dissatisfied with the care they've received; and outcomes from surgery may be highly variable.

Instead, I want to talk about what we want to achieve as a service. And, the critical point is at the top: 
"Delivering an effective patient pathway".

So, what do I mean by that?
- Achieving excellent patient-relevant outcomes
- Within budget
- Working efficiently, alongside HVLC work
- While training doctors, physios, specialist nurses, MDT administrators
- And furthering the Trust's values

On subsequent slides, I will go through these in turn to describe the areas of need in the department and the solutions I can offer.
-->

---
layout: statement
transition: fade
---

## Which outcomes do patients <span v-mark.red="0">_really_</span> care about?

<!--
We'll start with 'achieving excellent patient-relevant outcomes'.

As you know, two of the Trust's core values are: 'Patients first, always' and 'Excellence, in all we do'.

But, how do we put patients first? And, how do patients define excellence?
-->

---
layout: statement
---

<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>

<style>
        .quote {
            position: relative;
            font-size: 2em;
            text-align: center;
            font-weight: 300;
            opacity: 0.75;
            line-height: 1.5;
        }

        .quote p {
            display: inline-block;
            position: relative;
        }

        .quote .fas {
            font-size: 0.8em;
            vertical-align: middle;
        }

        .image-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-top: 20px;
        }

        .image-grid img {
            width: 100%;
            height: auto;
        }
    </style>

## My research interest

<br>
<v-clicks>
<div class="quote">
    <p italic><i class="fas fa-quote-left"></i><br>Understanding patient-relevant outcomes <br> and <br> how to measure these <br>
    <i class="fas fa-quote-right"></i></p>
</div>

<div class="image-grid">
    <img src="/mic.png" alt="MIC paper">
    <img src="/cosmin.png" alt="COSMIN paper">
    <img src="/pro.png" alt="Patient-relevant outcomes paper">
    <img src="/oks.png" alt="OKS paper">
</div>
</v-clicks>

<!--
This is my area of research interest.

My PhD thesis centred around understanding patient-relevant outcomes following revision knee replacement. The images below show a few recent publications.

At RNOH, I plan to have a strong research focus.

The themes for my research will centre around:
- Development of instruments for the measurement of outcome from the perspective of the patient, and
- The use of large, routinely collected datasets to guide research

In the longer term, I plan to raise funding for elective orthopaedic trials.

While my focus would be on arthroplasty, I would hope to support the wider department and Trust to raise our research profile more generally.
-->

---
layout: fact
transition: slide-up
---

# Budget {.important-text-3em}

<!--
Next, I want to talk about budget.

We know that revision arthroplasty is one of the most expensive interventions offered on the NHS.

Some procedures, especially those for prosthetic joint infection, are strongly associated with a budget deficit.

My experience as a Locum Consultant at the NOC in Oxford revealed that the Revision Network up-lift was often insufficient to achieve break-even. However, the additional Bone Infection Unit up-lift meant that their service remained viable. I understand this is a model we are trying to replicate at the RNOH, and I am keen to support this.
-->

---
class: flex gap-45 px-40 pt-30 text-lg
transition: slide-up
glow: bottom
---

<div transition duration-500 :class="$clicks === 0 ? 'translate-x-26 translate-y-20' : ''">

# Spend {.important-text-3em}

<div v-click forward:delay-600>

<div font-serif op75 text-xl mb2>Minimising</div>

<div op50 italic text-base>— Theatre costs 
  <br> &nbsp;&nbsp;&nbsp;> Custom implants
  <br> &nbsp;&nbsp;&nbsp;> Theatre trays
  <br> — Inpatient costs 
  <br> &nbsp;&nbsp;&nbsp;> Length of stay
</div>

</div>
</div>

<div transition duration-500 :class="$clicks === 0 ? 'translate-x--10 translate-y-20' : ''">

# Remuneration{.important-text-3em}


<div v-click forward:delay-600>

<div font-serif op75 text-xl mb2>Maximising</div>


<div op50 italic text-base>— Accurate coding
    <br> &nbsp;&nbsp;&nbsp;> Surgeon-driven
    <br>—  Focus on targets
    <br> &nbsp;&nbsp;&nbsp;> Revision Network uplift
    <br> &nbsp;&nbsp;&nbsp;> Best practice tariff
</div>

</div>
</div>

<!--
What else can be done?

We know budgets are about spend versus remuneration and having spoken to you and others over the past few weeks, the following are areas that I wish to highlight.

First, reducing theatre costs. I understand that a pathway to improve governance around the use of custom implants is already underway and I would plan to support this. We need to eliminate wastage of custom implants.

Second, rationalising theatre trays. This is something I have been involved with at the NOC. This involves two parts - (i) stripping sets down to their core components, which are cheaper to sterilise, greener and easier to handle for nursing staff and trainees; and (ii) cataloguing trays so that staff know exactly what they are unwrapping. At Oxford, I created the NOCBOOK, which - among lots of other things - was a website allowing staff to browse photographs of trays before unwrapping them.

Next, there is reducing inpatient costs, where the primary driver is usually length of stay. This means improving the pathway for patient transfers in and out of the Trust; reviewing our processes for pre-operative optimisation (both medically and socially); getting microbiology input early on; and educating nurses and allied health professionals about enhanced recovery.

My research has shown that some first, aseptic revisions are similar to primary joint replacements in terms of recovery. These are suitable targets for early mobilisation, and sometimes even daycase surgery.

Maximising remuneration is also important. There is no excuse for inaccurate coding, particularly if it reduces our remuneration. I would plan to create infrastructure to allow surgeons to drive this. This might be as simple as template operation notes, with common procedure and diagnostic codes. These could be built into the EPR. We need to achieve all top-up payments that are available, including the Revision Network uplift and the Best Practice Tariff for periprosthetic fractures. We need to identify the most complex procedures and go back to Commissioners to review how these are remunerated.
-->

---
layout: fact
transition: slide-up
---

# Efficiency {.important-text-3em}

<!--
Next, I want to highlight areas for efficiencies.
-->

---
class: flex gap-20 px-30 pt-40 text-lg
transition: slide-up
glow: bottom
---

<div transition duration-500 :class="$clicks === 0 ? 'translate-x-0 translate-y-30' : ''">

# MDT {.important-text-3em}

<div v-click forward:delay-600>

<div font-serif op75 text-xl mb2>IT solutions</div>

<div op50 italic text-base>> Allowing clinicians to be clinicians
    <br>> Nested within EPR
</div>

</div>
</div>

<div transition duration-500 :class="$clicks === 0 ? 'translate-x-0 translate-y-30' : ''">

# Innovation {.important-text-3em}

<div v-click forward:delay-600>

<div font-serif op75 text-xl mb2>New ways of working</div>

<div op50 italic text-base>> Pooled waiting lists
  <br>> Virtual clinics
</div>

</div>
</div>

<div transition duration-500 :class="$clicks === 0 ? 'translate-x-0 translate-y-30' : ''">

# Identity {.important-text-3em}

<div v-click forward:delay-600>

<div font-serif op75 text-xl mb2>Building a brand</div>

<div op50 italic text-base>> Templated comms</div>

</div>
</div>

<!--
I've selected out three areas:
- MDT
- Newer ways of working, and
- Building a brand

Around 10 years ago, I built databases for the London Implant Retrieval Centre and the Hip Debris MDT. A few years later, I built the database for the BIU MDT. These have not been modified a great deal since, despite new technology that would improve efficiency and reduce duplication of effort. The goal is to allow more time for clinicians to be clinicians. If appointed, I would plan to overhaul these systems as I did recently at Oxford. EPIC provides a fantastic opportunity for this.

I've also come from a system where pooled waiting lists are common. As a Locum Consultant, I operated almost entirely on pooled patients and I would support changes to increase the proportion of patients we pool. The main benefit to the department would be to more evenly distribute waiting lists.

I would also be keen to develop newer methods for follow-up, such as virtual clinics. There is an opportunity to be innovators on a national level, for example through the use of PROMs to screen patients for follow-up.

Finally, I want to mention efficiencies that could be achieved through improving our identity and 'building a brand'. I've highlighted templated communications. 'Autotexts' can easily be built into EPR for operation notes, clinic letters, etc. This would mean better and more consistent documentation, communication and remuneration.

There are also efficiencies to be had in theatre through improving homogeneity - for example, using fewer brands of implant or even all surgeons using the same closure techniques and surgical dressings.
-->

---
layout: fact
transition: slide-up
---

# Training {.important-text-3em}

<!--
As a teaching hospital and the 'hub' in the Revision Network model, it is important we also deliver world-class training.
-->

---
class: flex gap-40 px-30 pt-40 text-lg
transition: slide-up
glow: bottom
---

<div transition duration-500 :class="$clicks === 0 ? 'translate-x-5 translate-y-20' : ''">

# Recruitment {.important-text-3em}

<div v-click forward:delay-600>

<div font-serif op75 text-xl mb2>Attracting the brightest talent</div>

</div>
</div>

<div transition duration-500 :class="$clicks === 0 ? 'translate-x--5 translate-y-20' : ''">

# Development{.important-text-3em}

<div v-click forward:delay-600>

<div font-serif op75 text-xl mb2>Developing talent through innovative teaching & engagement</div>
        
</div>
</div>

<!--
I would focus on two areas to improve training within the Trust and wider Stanmore orthopaedic rotation, namely:

(i) Recruiting the best and the brightest talent; and

(ii) Developing that talent through innovative teaching and engagement methods.

I enjoy teaching and am education lead for the Bone Joint Journal. I have recently been part of a team developing a multimedia learning management system for the journal that you will see launched later this year. I would plan to bring this experience into the Trust. 

How does this relate to revision arthroplasty?

As a high-volume unit, we should be sharing our experience with surgical units around the country, across disciplines - i.e. surgeons, nursing staff, physiotherapists, etc.
-->

---
layout: image
image: /rnoh-values.png
backgroundSize: contain
---

<!--
In summary, the ideas I've described today gel very nicely with the Trust's values.

I've talked about putting patients first, developing a world-class research portfolio and innovations that encourage us to work as a team and to be flexible and adaptable.
-->

---
layout: image
image: /rnoh-strategy.png
backgroundSize: contain
---

<!--
My appointment would contribute to the academic programme within the Trust and I've laid out a strategy to achieve operational efficiencies. 

I'm very keen to be involved with the roll-out and development of EPR within the Trust. This is something I am genuinely interested in, and feel I could make an important contribution towards.
-->

---
layout: statement
---

# Thank you

<!--
Thank you for your attention, and I'd like to invite any questions.
-->
