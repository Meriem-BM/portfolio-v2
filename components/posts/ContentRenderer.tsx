"use client";

import { useState, useEffect } from "react";
import { ILogContent, ILogItem } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Terminal, Copy, Check, TrendingUp, TrendingDown, Minus, ExternalLink } from "lucide-react";

interface ContentRendererProps {
  item: ILogContent;
  index: number;
}

export const ContentRenderer = ({ item, index }: ContentRendererProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const baseClasses = `transition-all duration-500 ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
  }`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  switch (item.type) {
    case "hero":
      return (
        <div className={`${baseClasses} mb-8`}>
          <div className="relative rounded-lg border border-white/10 bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-green-900/20 p-8">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-green-500/5"></div>
            <p className="relative text-xl leading-relaxed font-light text-white/90">
              {item.content}
            </p>
          </div>
        </div>
      );

    case "heading":
      return (
        <h2 className={`${baseClasses} mb-6 flex items-center gap-3 text-3xl font-bold`}>
          <div className="h-8 w-1 bg-gradient-to-b from-cyan-400 to-purple-400"></div>
          {item.content}
        </h2>
      );

    case "subheading":
      return (
        <h3 className={`${baseClasses} mb-4 flex items-center gap-3 text-2xl font-semibold`}>
          <div className="h-6 w-0.5 bg-gradient-to-b from-green-400 to-blue-400"></div>
          {item.content}
        </h3>
      );

    case "text":
      return (
        <p className={`${baseClasses} mb-6 text-lg leading-relaxed text-white/80`}>
          {item.content}
        </p>
      );

    case "markdown":
      return (
        <div className={`${baseClasses} prose prose-invert mb-6 max-w-none`}>
          <div dangerouslySetInnerHTML={{ __html: item.content }} />
        </div>
      );

    case "code":
      return (
        <div className={`${baseClasses} mb-8`}>
          <Card className="overflow-hidden border border-green-500/30 bg-black/80">
            <div className="flex items-center justify-between border-b border-green-500/20 bg-green-500/5 p-4">
              <div className="flex items-center gap-3">
                <Terminal className="h-4 w-4 text-green-400" />
                <span className="font-mono text-sm text-green-400">{item.language}</span>
                {item.fileName && (
                  <Badge variant="outline" className="border-green-500/30 text-xs text-green-300">
                    {item.fileName}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(item.content)}
                  className="h-7 w-7 p-0 text-green-400 hover:bg-green-500/10"
                >
                  {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                </Button>
                <div className="flex gap-1">
                  <div className="h-3 w-3 rounded-full bg-red-500/60"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500/60"></div>
                </div>
              </div>
            </div>
            <CardContent className="p-0">
              <pre className="overflow-x-auto p-6">
                <code className="font-mono text-sm leading-relaxed text-green-300">
                  {item.content.split("\n").map((line, i) => (
                    <div
                      key={i}
                      className={`${
                        item.highlightLines?.includes(i + 1)
                          ? "-ml-2 border-l-2 border-green-400 bg-green-500/10 pl-2"
                          : ""
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                </code>
              </pre>
            </CardContent>
          </Card>
        </div>
      );

    case "callout":
      const variants = {
        info: {
          bg: "bg-blue-500/10",
          border: "border-blue-500/30",
          text: "text-blue-300",
          icon: "💡",
        },
        success: {
          bg: "bg-green-500/10",
          border: "border-green-500/30",
          text: "text-green-300",
          icon: "✅",
        },
        warning: {
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/30",
          text: "text-yellow-300",
          icon: "⚠️",
        },
        danger: {
          bg: "bg-red-500/10",
          border: "border-red-500/30",
          text: "text-red-300",
          icon: "🚨",
        },
      };
      const variant = variants[item.variant] || variants.info;

      return (
        <div className={`${baseClasses} mb-6`}>
          <Card className={`${variant.bg} border ${variant.border}`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{variant.icon}</span>
                <div className="flex-1">
                  {item.title && (
                    <h4 className={`${variant.text} mb-2 font-semibold`}>{item.title}</h4>
                  )}
                  <p className={`${variant.text} leading-relaxed`}>{item.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );

    case "list":
      const ListComponent = item.ordered ? "ol" : "ul";
      return (
        <div className={`${baseClasses} mb-6`}>
          <ListComponent className={`space-y-3 ${item.ordered ? "list-inside list-decimal" : ""}`}>
            {item.items?.map((listItem: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-white/80">
                {!item.ordered && (
                  <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"></div>
                )}
                <span className={item.ordered ? "mr-2 text-cyan-400" : ""}>{listItem}</span>
              </li>
            ))}
          </ListComponent>
        </div>
      );

    case "image":
      return (
        <div className={`${baseClasses} mb-8`}>
          <Card className="overflow-hidden border border-white/10 bg-black/50">
            <CardContent className="p-0">
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width || 800}
                height={item.height || 600}
                className="h-auto w-full"
              />
              {item.caption && (
                <div className="border-t border-white/10 p-4">
                  <p className="text-center text-sm text-white/60">{item.caption}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      );

    case "video":
      return (
        <div className={`${baseClasses} mb-8`}>
          <Card className="overflow-hidden border border-white/10 bg-black/50">
            <CardContent className="p-0">
              <video src={item.src} poster={item.poster} controls className="h-auto w-full" />
              {item.caption && (
                <div className="border-t border-white/10 p-4">
                  <p className="text-center text-sm text-white/60">{item.caption}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      );

    case "quote":
      return (
        <div className={`${baseClasses} mb-8`}>
          <Card className="border border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
            <CardContent className="p-6">
              <blockquote className="mb-4 text-xl text-white/90 italic">
                &quot;{item.content}&quot;
              </blockquote>
              {(item.author || item.source) && (
                <div className="text-sm text-white/60">
                  {item.author && <span>— {item.author}</span>}
                  {item.source && (
                    <span>
                      {item.author ? ", " : "— "}
                      {item.source}
                    </span>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      );

    case "table":
      return (
        <div className={`${baseClasses} mb-8`}>
          <Card className="overflow-hidden border border-white/10 bg-black/50">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10 bg-white/5">
                    <tr>
                      {item.headers.map((header, i) => (
                        <th
                          key={i}
                          className="px-4 py-3 text-left text-sm font-semibold text-white/80"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {item.rows.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 hover:bg-white/5">
                        {row.map((cell, j) => (
                          <td key={j} className="px-4 py-3 text-sm text-white/70">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {item.caption && (
                <div className="border-t border-white/10 p-4">
                  <p className="text-center text-sm text-white/60">{item.caption}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      );

    case "timeline":
      return (
        <div className={`${baseClasses} mb-8`}>
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-green-500 via-blue-500 to-purple-500"></div>
            <div className="space-y-6">
              {item?.items?.map((timelineItem: ILogItem, i: number) => (
                <div key={i} className="relative flex items-start gap-6">
                  <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-green-500 bg-black">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                  </div>
                  <Card className="flex-1 border border-white/10 bg-black/50 transition-colors hover:border-green-500/30">
                    <CardContent className="p-4">
                      <div className="mb-1 font-mono text-sm text-green-400">
                        {timelineItem.time}
                      </div>
                      <h4 className="mb-2 font-bold">{timelineItem.title}</h4>
                      <p className="text-sm text-white/70">{timelineItem.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "metrics":
      return (
        <div className={`${baseClasses} mb-8`}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {item.items.map((metric, i) => (
              <Card
                key={i}
                className="border border-white/10 bg-black/50 transition-colors hover:border-cyan-500/30"
              >
                <CardContent className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-sm font-medium text-white/60">{metric.label}</h4>
                    {metric.trend && (
                      <div
                        className={`flex items-center gap-1 text-xs ${
                          metric.trend === "up"
                            ? "text-green-400"
                            : metric.trend === "down"
                              ? "text-red-400"
                              : "text-gray-400"
                        }`}
                      >
                        {metric.trend === "up" && <TrendingUp className="h-3 w-3" />}
                        {metric.trend === "down" && <TrendingDown className="h-3 w-3" />}
                        {metric.trend === "neutral" && <Minus className="h-3 w-3" />}
                        {metric.change}
                      </div>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-cyan-400">{metric.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );

    case "separator":
      const separatorStyles = {
        line: "border-t border-white/20",
        dots: "border-t border-dotted border-white/20",
        gradient: "h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent",
      };

      return (
        <div className={`${baseClasses} my-8`}>
          <div className={separatorStyles[item.style || "line"]}></div>
        </div>
      );

    case "two-column":
      return (
        <div className={`${baseClasses} mb-8`}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              {item.left.map((leftItem, i) => (
                <ContentRenderer key={`left-${i}`} item={leftItem} index={i} />
              ))}
            </div>
            <div className="space-y-6">
              {item.right.map((rightItem, i) => (
                <ContentRenderer key={`right-${i}`} item={rightItem} index={i} />
              ))}
            </div>
          </div>
        </div>
      );

    case "tabs":
      return (
        <div className={`${baseClasses} mb-8`}>
          <Tabs defaultValue={item.tabs[0]?.label} className="w-full">
            <TabsList className="grid w-full grid-cols-2 border border-white/10 bg-black/50 lg:grid-cols-3">
              {item.tabs.map((tab, i) => (
                <TabsTrigger
                  key={i}
                  value={tab.label}
                  className="data-[state=active]:bg-cyan-500/20"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {item.tabs.map((tab, i) => (
              <TabsContent key={i} value={tab.label} className="mt-6">
                <div className="space-y-6">
                  {tab.content.map((tabItem, j) => (
                    <ContentRenderer key={`tab-${i}-${j}`} item={tabItem} index={j} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      );

    case "accordion":
      return (
        <div className={`${baseClasses} mb-8`}>
          <Accordion type="single" collapsible className="w-full">
            {item.items.map((accordionItem, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger className="text-white/80 hover:text-white">
                  {accordionItem.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6 pt-4">
                    {accordionItem.content.map((contentItem, j) => (
                      <ContentRenderer key={`accordion-${i}-${j}`} item={contentItem} index={j} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      );

    case "embed":
      return (
        <div className={`${baseClasses} mb-8`}>
          <Card className="border border-white/10 bg-black/50 transition-colors hover:border-blue-500/30">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  {item.title && <h4 className="mb-1 font-semibold text-white/90">{item.title}</h4>}
                  {item.description && <p className="text-sm text-white/60">{item.description}</p>}
                  {item.provider && (
                    <Badge
                      variant="outline"
                      className="mt-2 border-blue-500/30 text-xs text-blue-300"
                    >
                      {item.provider}
                    </Badge>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(item.url, "_blank")}
                  className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  View
                </Button>
              </div>
              <div className="font-mono text-xs break-all text-white/40">{item.url}</div>
            </CardContent>
          </Card>
        </div>
      );

    case "interactive":
      return (
        <div className={`${baseClasses} mb-6`}>
          <Card className="group cursor-pointer border border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20 transition-all duration-300 hover:border-pink-500/50">
            <CardContent className="p-6">
              <p className="transform text-white/80 transition-colors duration-300 group-hover:scale-105 group-hover:text-white">
                {item.content}
              </p>
            </CardContent>
          </Card>
        </div>
      );

    default:
      return null;
  }
};
