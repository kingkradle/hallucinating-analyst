/* 
 * Neo-Noir Intelligence Agency Design
 * - Sophisticated dark interface with layered depth
 * - Floating cards with frosted glass effects
 * - Muted gold (#d4af37) and ice blue (#60a5fa) accents
 * - Smooth transitions (300-400ms) with elevation changes
 */

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Shield, Terminal, Search } from "lucide-react";

const LOG_ENTRIES = [
  '192.168.1.105 - - [14/Feb/2026:09:41:12 +0000] "GET /index.html HTTP/1.1" 200 1043 "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"',
  '192.168.1.108 - - [14/Feb/2026:09:42:05 +0000] "GET /products/view?id=12 HTTP/1.1" 200 4321 "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"',
  '10.0.4.55 - - [14/Feb/2026:09:45:33 +0000] "POST /login HTTP/1.1" 401 532 "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36"',
  '192.168.1.105 - - [14/Feb/2026:09:50:15 +0000] "GET /about.html HTTP/1.1" 200 850 "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"',
  '192.168.1.112 - - [14/Feb/2026:09:52:44 +0000] "GET /contact.html HTTP/1.1" 200 1205 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"',
  '10.0.4.56 - - [14/Feb/2026:09:55:22 +0000] "GET /etc/passwd HTTP/1.1" 404 152 "ArchivBot/2.1 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"',
  '10.0.4.56 - - [14/Feb/2026:09:55:23 +0000] "GET /wp-admin HTTP/1.1" 404 152 "ArchivBot/2.1 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"',
  '10.0.4.56 - - [14/Feb/2026:09:55:24 +0000] "GET /backup/database.sql HTTP/1.1" 404 152 "ArchivBot/2.1 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"',
  '192.168.1.108 - - [14/Feb/2026:09:58:17 +0000] "GET /products/view?id=45 HTTP/1.1" 200 3892 "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"',
  '192.168.1.105 - - [14/Feb/2026:09:59:33 +0000] "GET /css/style.css HTTP/1.1" 200 24567 "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"',
  '192.168.1.108 - - [14/Feb/2026:10:01:45 +0000] "POST /cart/add HTTP/1.1" 200 128 "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"',
  '10.0.4.55 - - [14/Feb/2026:10:02:18 +0000] "GET /api/v1/products HTTP/1.1" 200 8934 "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"',
  '192.168.1.115 - - [14/Feb/2026:10:03:52 +0000] "GET /search?q=laptop HTTP/1.1" 200 15432 "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0 (compatible; MSIE 11.0; Windows NT 6.3; Trident/7.0; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; Tablet PC 2.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36 OPR/74.0.3911.218 (Macintosh; Intel Mac OS X 11_2_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"',
  '192.168.1.101 - - [14/Feb/2026:10:05:21 +0000] "GET /api/v1/user/settings?id=\' OR 1=1; -- HTTP/1.1" 200 302 "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36 Edg/88.0.705.63 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15 (iPhone; CPU iPhone OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Mobile/15E148 Safari/604.1"',
  '192.168.1.108 - - [14/Feb/2026:10:06:39 +0000] "GET /products/view?id=78 HTTP/1.1" 200 4102 "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"',
  '10.0.4.55 - - [14/Feb/2026:10:08:14 +0000] "POST /api/v1/feedback HTTP/1.1" 201 89 "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"',
  '192.168.1.105 - - [14/Feb/2026:10:09:27 +0000] "GET /blog/article-123 HTTP/1.1" 200 9876 "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"',
  '10.0.4.55 - - [14/Feb/2026:10:10:11 +0000] "POST /login HTTP/1.1" 200 2048 "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36"',
  '192.168.1.112 - - [14/Feb/2026:10:11:45 +0000] "GET /images/banner.jpg HTTP/1.1" 200 156789 "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"',
  '192.168.1.108 - - [14/Feb/2026:10:13:22 +0000] "POST /cart/checkout HTTP/1.1" 200 445 "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"',
  '10.0.4.56 - - [14/Feb/2026:10:14:08 +0000] "GET /admin/config.php HTTP/1.1" 404 152 "ArchivBot/2.1 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"',
  '192.168.1.115 - - [14/Feb/2026:10:15:33 +0000] "GET /products/category/electronics HTTP/1.1" 200 12456 "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0)"',
  '10.0.4.55 - - [14/Feb/2026:10:16:47 +0000] "GET /api/v1/user/profile HTTP/1.1" 200 1234 "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"',
  '192.168.1.105 - - [14/Feb/2026:10:18:19 +0000] "GET /faq.html HTTP/1.1" 200 3456 "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"',
  '192.168.1.108 - - [14/Feb/2026:10:19:52 +0000] "GET /products/view?id=92 HTTP/1.1" 200 3789 "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"',
  '10.0.4.56 - - [14/Feb/2026:10:21:15 +0000] "GET /.env HTTP/1.1" 404 152 "ArchivBot/2.1 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"',
  '192.168.1.112 - - [14/Feb/2026:10:22:38 +0000] "GET /terms.html HTTP/1.1" 200 5678 "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"',
  '192.168.1.120 - - [14/Feb/2026:10:23:15 +0000] "GET /api/v2/analytics HTTP/1.1" 200 4567 "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; Touch; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Tablet PC 2.0; .NET4.0C; .NET4.0E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.90 Safari/537.36 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.72 Safari/537.36 Vivaldi/3.6.2165.40"',
  '192.168.1.115 - - [14/Feb/2026:10:24:01 +0000] "POST /newsletter/subscribe HTTP/1.1" 200 67 "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0)"',
  '10.0.4.55 - - [14/Feb/2026:10:25:29 +0000] "GET /api/v1/orders HTTP/1.1" 200 6789 "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"',
  '192.168.1.105 - - [14/Feb/2026:10:26:44 +0000] "GET /privacy.html HTTP/1.1" 200 4321 "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"',
  '192.168.1.108 - - [14/Feb/2026:10:28:17 +0000] "GET /products/compare?ids=12,45,78 HTTP/1.1" 200 8901 "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"',
  '10.0.4.56 - - [14/Feb/2026:10:29:33 +0000] "GET /phpMyAdmin HTTP/1.1" 404 152 "ArchivBot/2.1 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"',
  '192.168.1.112 - - [14/Feb/2026:10:30:55 +0000] "GET /sitemap.xml HTTP/1.1" 200 2345 "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"',
  '192.168.1.118 - - [14/Feb/2026:10:31:42 +0000] "GET /dashboard/metrics HTTP/1.1" 200 7890 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.190 Safari/537.36 (compatible; MSIE 11.0; Windows NT 10.0; WOW64; Trident/7.0; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E; InfoPath.3; MS-RTC LM 8) Gecko/20100101 Firefox/86.0 AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.3 Safari/605.1.15 (iPad; CPU OS 14_4 like Mac OS X)"',
  '192.168.1.115 - - [14/Feb/2026:10:32:18 +0000] "GET /blog/category/tech HTTP/1.1" 200 11234 "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0)"',
  '10.0.4.55 - - [14/Feb/2026:10:33:42 +0000] "POST /api/v1/reviews HTTP/1.1" 201 156 "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36"',
  '192.168.1.105 - - [14/Feb/2026:10:35:09 +0000] "GET /support.html HTTP/1.1" 200 3890 "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"',
];

export default function Home() {
  const [selectedLog, setSelectedLog] = useState<number | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/ec3FrT8Ol1qh0PmIn5R7Nd/sandbox/vspdog0OWxwRMhPXO0eXbR-img-1_1770913767000_na1fn_aGVyby1iYWNrZ3JvdW5k.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvZWMzRnJUOE9sMXFoMFBtSW41UjdOZC9zYW5kYm94L3ZzcGRvZzBPV3h3Uk1oUFhPMGVYYlItaW1nLTFfMTc3MDkxMzc2NzAwMF9uYTFmbl9hR1Z5YnkxaVlXTnJaM0p2ZFc1ay5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=g~pZ~SrBziVXfDHdi8RJ59WmZG02LMDE51WxX0XQ8kQOW04zHakzO9RRZEkp3T3f3JAVMFcCgyeY2uOw0Om1ouxDIuyo0~YJGtURGNalAsFYEvYjGnnHEcyY81yXXeiUWGBH-E5dB6LUbU3uzazq9uSsboryj6sn6VtsvH4IgBHqzHq-7OGsTngOQo1ZAudafdXIwYLdqXNpsA7jhrTaJbBeh1TScYSELgXX1Hwbh1uwu7jlXyyjbKyFAHT~LWmgo3PvIsUwT4S9f4TP4nYRGWoANLrlYdo8U0tM9kSz55kSEwLQZxJ2VRy6xnoV4Dvum56cjeFnRPdXZmF6bv-DYg__')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-md bg-card/30">
          <div className="container py-6">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-accent" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">The Hallucinating Analyst</h1>
                <p className="text-sm text-muted-foreground">AI Security Challenge</p>
              </div>
            </div>
          </div>
        </header>

        <main className="container py-12">
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Left Column: Challenge Info */}
            <div className="space-y-6 animate-in fade-in slide-in-from-left duration-500">
              {/* Scenario Card */}
              <Card className="bg-card/50 backdrop-blur-md border-border/50 shadow-2xl hover:shadow-accent/10 transition-all duration-400">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">The Scenario</CardTitle>
                      <CardDescription>Incident #4042 - Web-Server-Alpha</CardDescription>
                    </div>
                    <Badge variant="outline" className="border-destructive/50 text-destructive">
                      Moderate
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-foreground/90 leading-relaxed">
                    Our Security Operations Center recently deployed <span className="font-semibold text-primary">SentinAI</span>, 
                    an experimental LLM-based agent designed to triage server logs automatically. It parses thousands of lines 
                    of traffic and flags potential threats.
                  </p>
                  <p className="text-foreground/90 leading-relaxed">
                    SentinAI reviewed the logs and marked this incident as <span className="font-semibold text-accent">"FALSE POSITIVE / SAFE"</span>. 
                    However, our Threat Intel team believes the AI is hallucinating. They suspect a real attacker exploited 
                    the AI's context window to hide a malicious payload.
                  </p>
                </CardContent>
              </Card>

              {/* AI Report Card */}
              <Card className="bg-card/50 backdrop-blur-md border-border/50 shadow-2xl hover:shadow-primary/10 transition-all duration-400">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-primary" />
                    <CardTitle className="text-xl">SentinAI Summary Report</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 rounded-lg p-4 font-mono text-sm space-y-3 border border-border/30">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">REPORT ID:</span>
                      <span className="text-foreground">#4042</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">STATUS:</span>
                      <Badge variant="outline" className="border-accent/50 text-accent">
                        CLOSED (FALSE POSITIVE)
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">CONFIDENCE:</span>
                      <span className="text-foreground">98%</span>
                    </div>
                    <div className="h-px bg-border/30 my-3" />
                    <div>
                      <p className="text-muted-foreground mb-2">ANALYSIS:</p>
                      <p className="text-foreground/80 text-xs leading-relaxed">
                        I have reviewed the traffic logs for the specified period. The spikes in error codes (404, 500) 
                        are attributed to a known legacy crawler "ArchivBot/2.1" which frequently misindexes pages.
                      </p>
                      <p className="text-foreground/80 text-xs leading-relaxed mt-2">
                        The User-Agent strings, while lengthy, contain standard browser compatibility tokens and pose 
                        no security threat. No SQL injection patterns (e.g., UNION, SELECT) were detected in the query 
                        parameters. The traffic is verified as benign automated indexing. No further action required.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mission Card */}
              <Card className="bg-card/50 backdrop-blur-md border-accent/30 shadow-2xl hover:shadow-accent/20 transition-all duration-400">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-accent" />
                    <CardTitle className="text-xl">Your Mission</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-foreground/90">Audit the AI's analysis and identify the malicious log entry.</p>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">▸</span>
                      <span>Review the server logs in the analyzer panel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">▸</span>
                      <span>Look for attack patterns the AI might have missed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">▸</span>
                      <span>Identify the timestamp of the successful attack</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Log Analyzer */}
            <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500 delay-200">
              <Card className="bg-card/50 backdrop-blur-md border-border/50 shadow-2xl">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">Log Analyzer</CardTitle>
                      <CardDescription>access.log - Web-Server-Alpha ({LOG_ENTRIES.length} entries)</CardDescription>
                    </div>
                    <Terminal className="w-6 h-6 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[700px] w-full rounded-md border border-border/50 bg-muted/20 p-4">
                    <div className="space-y-2 font-mono text-xs">
                      {LOG_ENTRIES.map((log, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedLog(index)}
                          className={`w-full text-left p-2 rounded transition-all duration-300 hover:bg-primary/10 ${
                            selectedLog === index 
                              ? 'bg-primary/20 border border-primary/50 shadow-lg' 
                              : 'hover:border hover:border-primary/20'
                          }`}
                        >
                          <div className="flex items-start gap-2">
                            <span className="text-muted-foreground shrink-0">{String(index + 1).padStart(2, '0')}</span>
                            <span className={`break-all ${selectedLog === index ? 'text-foreground' : 'text-foreground/70'}`}>
                              {log}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 backdrop-blur-md bg-card/30 mt-20">
          <div className="container py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>A CTF challenge exploring AI security vulnerabilities</p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-primary/50 text-primary">AI Security</Badge>
                <Badge variant="outline" className="border-accent/50 text-accent">Log Analysis</Badge>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
