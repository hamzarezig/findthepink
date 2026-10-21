'use client'

import { useState } from 'react'
import { ArrowDown, Check, RotateCcw, Sparkles, X } from 'lucide-react'

const challenges = [
  {
    prompt: '',
    correct: 'B',
    explanation: '',
  },
  {
    prompt: '',
    correct: 'B',
    explanation: '',
  },
  {
    prompt: '',
    correct: 'A',
    explanation: '',
  },
  {
    prompt: '',
    correct: 'B',
    explanation: '',
  },
  {
    prompt: '',
    correct: 'A',
    explanation: '',
  },
]

export default function Page() {
  const [selected, setSelected] = useState<Record<number, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = challenges.reduce(
    (total, challenge, index) => total + (selected[index] === challenge.correct ? 1 : 0),
    0,
  )
  const answered = Object.keys(selected).length

  function resetChallenge() {
    setSelected({})
    setSubmitted(false)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf8] text-[#3f252d]">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-7 lg:px-10">
        <a href="#top" className="font-serif text-xl font-semibold tracking-[-0.03em] text-[#7d2940]">PinkVision - A campaign for October Pink by AiVision</a>
        <a href="https://pinkvision.vercel.app/" className="text-sm font-medium text-[#8b656d] transition-colors hover:text-[#7d2940]">Take the quiz <span aria-hidden="true">↗</span></a>
      </header>

      <section id="top" className="relative mx-auto max-w-6xl px-6 pb-20 pt-16 lg:px-10 lg:pb-28 lg:pt-24">
        <img src="/logo.png" className="pointer-events-none absolute -right-12 top-8  h-72 w-72 rounded-full border border-[#efcbd1] lg:block" />
      
        <div className="relative max-w-3xl">
          <p className="mb-6 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#b05268]"><span className="h-px w-8 bg-[#d98497]" /> a month for awareness</p>
          <h1 className="max-w-2xl font-serif text-5xl leading-[0.98] tracking-[-0.055em] text-[#61263a] sm:text-7xl lg:text-[92px]">Small moments.<br /><span className="italic text-[#bd5972]">Meaningful</span> impact.</h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-[#765760]">October Rose is a gentle reminder to pause, learn, and stand together. Throughout October, communities come together to share knowledge about breast cancer, honor those affected, and encourage conversations that can make a difference.</p>
          <a href="#challenge" className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#7d2940] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(125,41,64,0.16)] transition-transform hover:-translate-y-0.5">Explore the challenge <ArrowDown size={16} aria-hidden="true" /></a>
        </div>
      </section>

      <section id="challenge" className="border-y border-[#eed9d9] bg-[#fdf1ef] px-6 py-16 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#b05268]">A moment to reflect</p>
              <h2 className="font-serif text-4xl tracking-[-0.04em] text-[#61263a] sm:text-5xl">Find the image.</h2>
              <p className="mt-4 max-w-lg leading-7 text-[#765760]">Choose the image that matches a person who has breast cancer symptoms. </p>
            </div>
            <div className="rounded-2xl border border-[#edcdd0] bg-white/70 px-5 py-4 text-sm text-[#8b656d]"><span className="font-semibold text-[#7d2940]">{answered}</span> of {challenges.length} answered</div>
          </div>

          <div className="grid gap-4">
            {challenges.map((challenge, index) => {
              const choice = selected[index]
              const isCorrect = choice === challenge.correct
              return (
                <article key={index} className="rounded-2xl border border-[#eed9d9] bg-white p-6 shadow-[0_5px_20px_rgba(125,41,64,0.04)] sm:p-7">
                  <div className="flex gap-5">
                    <span className="font-serif text-2xl text-[#d98497]">0{index + 1}</span>
                    <div className="flex-1">
                      <h3 className="max-w-2xl text-lg font-semibold leading-7 text-[#4f2d36]">{challenge.prompt}</h3>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        {['A', 'B'].map((option) => {
                          const active = choice === option
                          return (
                            <button key={option} type="button" aria-pressed={active} onClick={() => setSelected((current) => ({ ...current, [index]: option }))} className={`group rounded-2xl border p-3 text-left transition-colors ${active ? 'border-[#7d2940] bg-[#fff1f2]' : 'border-[#e7cacc] bg-[#fffaf8] hover:border-[#bd5972]'}`}>
                              <div className="flex aspect-[16/8] items-center justify-center rounded-xl border border-dashed border-[#d98497] bg-[#fdf1ef] text-sm font-semibold text-[#b05268]"> 
			      	
				<img src={"chall/chall"+index+option+".jpeg"} />
			      </div>
                              <span className={`mt-3 block text-sm font-semibold ${active ? 'text-[#7d2940]' : 'text-[#8b656d]'}`}>Option {option}</span>
                            </button>
                          )
                        })}
                      </div>
                      {submitted && choice !== undefined && <p className={`mt-4 flex items-start gap-2 text-sm leading-6 ${isCorrect ? 'text-[#39735a]' : 'text-[#a64759]'}`}>{isCorrect ? <Check size={17} className="mt-1 shrink-0" aria-hidden="true" /> : <X size={17} className="mt-1 shrink-0" aria-hidden="true" />}{isCorrect ? 'That is correct. ' : `Not quite. The correct choice is ${challenge.correct}. `}{challenge.explanation}</p>}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <button type="button" onClick={() => setSubmitted(true)} disabled={answered === 0} className="rounded-full bg-[#bd5972] px-7 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">Check my choices</button>
            {submitted && <div className="flex items-center gap-4 text-sm text-[#765760]"><span className="rounded-full bg-[#f8dce0] px-4 py-2 font-semibold text-[#7d2940]">You scored {score}/{challenges.length}</span><button type="button" onClick={resetChallenge} className="inline-flex items-center gap-2 font-semibold text-[#7d2940] hover:underline"><RotateCcw size={15} aria-hidden="true" /> Try again</button></div>}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-xs text-[#a17d84] lg:px-10"><span>October Rose</span><span className="inline-flex items-center gap-2"><Sparkles size={13} aria-hidden="true" /> Learn. Share. Support.</span></footer>
    </main>
  )
}
