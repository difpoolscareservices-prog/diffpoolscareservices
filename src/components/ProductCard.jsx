import React from 'react';
import { CheckCircle2, ShoppingCart, ChevronRight, Star } from 'lucide-react';

/**
 * Theme config maps a product theme name to Tailwind class sets.
 * Extend this object when adding new colour themes.
 */
const THEME = {
  blue: {
    border: 'hover:border-blue-300',
    shadow: 'hover:shadow-blue-100',
    imageBg: 'from-blue-50 to-cyan-50',
    imageTint: 'from-blue-500/5 to-cyan-500/10',
    badge: 'bg-blue-600',
    categoryText: 'text-blue-500',
    check: 'text-blue-500',
    cta: 'bg-blue-600 hover:bg-blue-700 shadow-blue-200',
  },
  cyan: {
    border: 'hover:border-cyan-400',
    shadow: 'hover:shadow-cyan-100',
    imageBg: 'from-cyan-50 to-teal-50',
    imageTint: 'from-cyan-500/5 to-teal-500/10',
    badge: 'bg-cyan-600',
    categoryText: 'text-cyan-600',
    check: 'text-cyan-500',
    cta: 'bg-cyan-600 hover:bg-cyan-700 shadow-cyan-200',
  },
  teal: {
    border: 'hover:border-teal-400',
    shadow: 'hover:shadow-teal-100',
    imageBg: 'from-teal-50 to-emerald-50',
    imageTint: 'from-teal-500/5 to-emerald-500/10',
    badge: 'bg-teal-600',
    categoryText: 'text-teal-600',
    check: 'text-teal-500',
    cta: 'bg-teal-600 hover:bg-teal-700 shadow-teal-200',
  },
  indigo: {
    border: 'hover:border-indigo-400',
    shadow: 'hover:shadow-indigo-100',
    imageBg: 'from-indigo-50 to-purple-50',
    imageTint: 'from-indigo-500/5 to-purple-500/10',
    badge: 'bg-indigo-600',
    categoryText: 'text-indigo-600',
    check: 'text-indigo-500',
    cta: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200',
  },
  emerald: {
    border: 'hover:border-emerald-400',
    shadow: 'hover:shadow-emerald-100',
    imageBg: 'from-emerald-50 to-green-50',
    imageTint: 'from-emerald-500/5 to-green-500/10',
    badge: 'bg-emerald-600',
    categoryText: 'text-emerald-600',
    check: 'text-emerald-500',
    cta: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200',
  },
  orange: {
    border: 'hover:border-orange-400',
    shadow: 'hover:shadow-orange-100',
    imageBg: 'from-orange-50 to-amber-50',
    imageTint: 'from-orange-500/5 to-amber-500/10',
    badge: 'bg-orange-500',
    categoryText: 'text-orange-600',
    check: 'text-orange-500',
    cta: 'bg-orange-500 hover:bg-orange-600 shadow-orange-200',
  },
};

/**
 * ProductCard
 *
 * Props: product (object from products.js data file)
 *
 * All visual styling is derived from product.theme — no hardcoded colours here.
 */
export default function ProductCard({ product }) {
  const t = THEME[product.theme] ?? THEME.blue;

  const waHref = `https://wa.me/254143618364?text=${encodeURIComponent(
    product.whatsappMessage
  )}`;

  return (
    <div
      className={[
        'group relative bg-gradient-to-br from-slate-50 to-blue-50/30',
        'rounded-3xl border border-slate-200',
        t.border,
        'shadow-md hover:shadow-2xl',
        t.shadow,
        'transition-all duration-500 overflow-hidden flex flex-col',
      ].join(' ')}
    >
      {/* ── Badges ── */}
      <div className="absolute top-4 left-4 z-10 flex gap-2 flex-wrap">
        <span
          className={`inline-flex items-center gap-1.5 ${t.badge} text-white text-[10px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md`}
        >
          {product.badge}
        </span>
        {product.inStock && (
          <span className="inline-flex items-center bg-emerald-500 text-white text-[10px] font-extrabold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-md">
            In Stock
          </span>
        )}
      </div>

      {/* ── Product Image ── */}
      <div
        className={`relative h-72 bg-gradient-to-br ${t.imageBg} overflow-hidden flex items-center justify-center p-8`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${t.imageTint}`} />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50/80 to-transparent" />
        <img
          src={product.image}
          alt={product.alt}
          className="relative z-10 h-52 w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      {/* ── Product Info ── */}
      <div className="p-7 flex-1 flex flex-col">

        {/* Name + Rating */}
        <div className="flex items-start justify-between mb-1">
          <div>
            <p className={`text-xs font-bold ${t.categoryText} uppercase tracking-widest mb-1`}>
              {product.category}
            </p>
            <h3 className="text-2xl font-extrabold text-slate-900 font-outfit leading-tight">
              {product.name}
            </h3>
            <p className="text-sm text-slate-500 mt-0.5 font-medium">{product.subtitle}</p>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg flex-shrink-0">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-bold text-amber-700">{product.rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed mt-3 mb-5">{product.description}</p>

        {/* Specs Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {product.specs.map(([label, value]) => (
            <div key={label} className="bg-white rounded-xl px-3 py-2.5 border border-slate-100 shadow-sm">
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">{label}</div>
              <div className="text-xs font-bold text-slate-800 mt-0.5">{value}</div>
            </div>
          ))}
        </div>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {product.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs text-slate-600">
              <CheckCircle2 className={`w-4 h-4 ${t.check} flex-shrink-0 mt-0.5`} />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="mt-auto flex flex-col sm:flex-row gap-3">
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className={`flex-1 flex items-center justify-center gap-2 ${t.cta} text-white font-bold py-3.5 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-0.5 text-sm`}
          >
            <ShoppingCart className="w-4 h-4" /> Enquire on WhatsApp
          </a>
          <a
            href="#contact"
            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl transition-all duration-300 text-sm border border-slate-200"
          >
            Get Quote <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
