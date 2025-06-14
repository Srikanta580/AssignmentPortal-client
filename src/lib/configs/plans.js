// src/config/plans.js
import React from "react";
import {
  FiDatabase,
  FiLayers,
  FiCode,
  FiZap,
  FiServer,
  FiBarChart2,
  FiShield,
  FiHeadphones,
  FiCheckCircle,
} from "react-icons/fi";

export const plans = [
  {
    name: "Free Tier",
    tier: "Starter",
    icon: React.createElement(FiCheckCircle, {
      className: "text-green-500",
      size: 24,
    }),
    price: "Free",
    priceInfo: {
      unitAmount: 0,
      currency: "usd",
      priceId: null,
    },
    description: "Get started risk-free with limited access to core modules.",
    features: [
      { text: "Access to basic modules", icon: React.createElement(FiLayers) },
      { text: "Limited API calls", icon: React.createElement(FiZap) },
      { text: "Community support", icon: React.createElement(FiHeadphones) },
    ],
    cta: "Try for Free",
    bestFor: "Testing, small colleges",
    highlighted: false,
    color: "green",
  },
  {
    name: "Shared-DB Plan",
    tier: "Standard",
    icon: React.createElement(FiDatabase, {
      className: "text-cyan-600",
      size: 24,
    }),
    price: "$499/month",
    priceInfo: {
      unitAmount: 49900,
      currency: "usd",
      priceId: null,
    },
    description:
      "Affordable & quick setup—get started in days with full-feature access!",
    features: [
      {
        text: "Shared database (row-level isolation)",
        icon: React.createElement(FiDatabase),
      },
      {
        text: "Standard modules (assignments, attendance)",
        icon: React.createElement(FiLayers),
      },
      {
        text: "Basic customization (themes, logos)",
        icon: React.createElement(FiCode),
      },
      { text: "Fixed API rate limits", icon: React.createElement(FiZap) },
    ],
    cta: "Start Free Trial",
    bestFor: "Small/medium universities",
    highlighted: false,
    color: "cyan",
  },
  {
    name: "Dedicated Schema",
    tier: "Professional",
    icon: React.createElement(FiServer, {
      className: "text-teal-500",
      size: 24,
    }),
    price: "$1,499/month",
    priceInfo: {
      unitAmount: 149900,
      currency: "usd",
      priceId: null,
    },
    description:
      "Your own isolated environment within our shared cloud—performance + flexibility.",
    features: [
      {
        text: "Shared DB with dedicated schema",
        icon: React.createElement(FiServer),
      },
      {
        text: "Advanced modules & analytics",
        icon: React.createElement(FiBarChart2),
      },
      {
        text: "Higher performance guarantees",
        icon: React.createElement(FiZap),
      },
      { text: "Custom module toggling", icon: React.createElement(FiCode) },
    ],
    cta: "Get Started",
    bestFor: "Growing institutions",
    highlighted: true,
    color: "teal",
  },
  {
    name: "Dedicated Database",
    tier: "Enterprise",
    icon: React.createElement(FiShield, {
      className: "text-purple-600",
      size: 24,
    }),
    price: "Custom Pricing",
    priceInfo: {
      unitAmount: null,
      currency: "usd",
      priceId: null,
    },
    description:
      "Enterprise-grade security, control, and performance—your own cloud, your way.",
    features: [
      { text: "Full database isolation", icon: React.createElement(FiShield) },
      { text: "White-labeling & branding", icon: React.createElement(FiCode) },
      { text: "99.9% uptime SLA", icon: React.createElement(FiZap) },
      {
        text: "Dedicated account manager",
        icon: React.createElement(FiHeadphones),
      },
      {
        text: "Compliance-ready (GDPR, etc.)",
        icon: React.createElement(FiShield),
      },
    ],
    cta: "Contact Sales",
    bestFor: "Large universities & enterprises",
    highlighted: false,
    color: "purple",
  },
];
