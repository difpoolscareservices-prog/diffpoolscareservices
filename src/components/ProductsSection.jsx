import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from './ProductCard';

/**
 * ProductsSection
 *
 * Renders all products from the product catalog.
 * To add, edit, or remove a product, update src/data/products.js only.
 */
export default function ProductsSection() {
  return (
    <section id="products" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-bold tracking-[0.3em] text-blue-600 uppercase mb-2">
            Pool Care Supplies
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-outfit">
            Our Products
          </h2>
          <div className="mt-4 h-1 w-16 bg-blue-600 mx-auto rounded-full" />
          <p className="text-slate-500 mt-4 text-base leading-relaxed">
            Professional-grade pool chemicals trusted by DIF technicians and pool owners across Kenya.
            Keep your water crystal-clear and perfectly balanced year-round.
          </p>
        </div>

        {/* ── Product Grid ── */}
        {products.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-400 py-16">No products listed yet.</p>
        )}

        {/* ── Bottom CTA Banner ── */}
        <div className="mt-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-8 sm:p-10 text-center text-white shadow-2xl shadow-blue-200">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-blue-200 mb-2">
            DIF Chemical Supply
          </p>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-outfit mb-3">
            Need Pool Chemicals Delivered?
          </h3>
          <p className="text-blue-100 text-sm sm:text-base max-w-xl mx-auto mb-7 leading-relaxed">
            We supply chlorine, algaecides, pH adjusters, and water testing kits directly to your pool.
            Ask our team about chemical subscription packages.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/254143618364?text=Hi%20DIF%20Pools%2C%20I%20would%20like%20to%20order%20pool%20chemicals.%20Please%20send%20me%20your%20product%20list%20and%20pricing."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-bold px-8 py-3.5 rounded-full shadow-xl hover:bg-blue-50 transition-all duration-300 hover:-translate-y-0.5 text-sm"
            >
              <MessageSquare className="w-4 h-4" /> Order via WhatsApp
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-full backdrop-blur-sm transition-all duration-300 text-sm"
            >
              Request Chemical Quote <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
