<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
                xmlns:html="http://www.w3.org/TR/REC-html40"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
    <xsl:template match="/">
        <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <title>XML Sitemap | LT Developer</title>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                <style type="text/css">
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                        color: #cfd2d6;
                        background-color: #18191a;
                        margin: 0;
                        padding: 2rem;
                    }
                    .container {
                        max-width: 1000px;
                        margin: 0 auto;
                        background: #242526;
                        padding: 2rem;
                        border-radius: 12px;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    }
                    h1 { font-size: 24px; color: #fff; margin-top: 0; }
                    p { font-size: 14px; color: #a0a5ad; line-height: 1.5; }
                    a { color: #3ea6ff; text-decoration: none; }
                    a:hover { text-decoration: underline; }
                    table { width: 100%; border-collapse: collapse; margin-top: 1.5rem; }
                    th { text-align: left; padding: 10px; font-size: 12px; text-transform: uppercase; color: #a0a5ad; border-bottom: 2px solid #3a3b3c; }
                    td { padding: 12px 10px; font-size: 14px; border-bottom: 1px solid #3a3b3c; word-break: break-all; }
                    tr:hover td { background: rgba(255,255,255,0.02); }
                    .footer { margin-top: 2rem; text-align: center; font-size: 12px; color: #65676b; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>XML Sitemap Index</h1>
                    <p>This is a stylized XML Sitemap generated for search engine discovery. You can find more information about XML sitemaps on <a href="https://sitemaps.org" target="_blank">sitemaps.org</a>.</p>
                    
                    <!-- If it's a sitemap index -->
                    <xsl:if test="count(sitemap:sitemapindex/sitemap:sitemap) &gt; 0">
                        <table>
                            <thead>
                                <tr>
                                    <th style="width: 75%;">Sitemap URL</th>
                                    <th style="width: 25%;">Last Modified</th>
                                </tr>
                            </thead>
                            <tbody>
                                <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
                                    <tr>
                                        <td>
                                            <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                                        </td>
                                        <td><xsl:value-of select="sitemap:lastmod"/></td>
                                    </tr>
                                </xsl:for-each>
                            </tbody>
                        </table>
                    </xsl:if>

                    <!-- If it's a regular sitemap containing URLs -->
                    <xsl:if test="count(sitemap:urlset/sitemap:url) &gt; 0">
                        <table>
                            <thead>
                                <tr>
                                    <th style="width: 60%;">URL</th>
                                    <th style="width: 15%;">Priority</th>
                                    <th style="width: 25%;">Last Modified</th>
                                </tr>
                            </thead>
                            <tbody>
                                <xsl:for-each select="sitemap:urlset/sitemap:url">
                                    <tr>
                                        <td>
                                            <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
                                        </td>
                                        <td><xsl:value-of select="sitemap:priority"/></td>
                                        <td><xsl:value-of select="sitemap:lastmod"/></td>
                                    </tr>
                                </xsl:for-each>
                            </tbody>
                        </table>
                    </xsl:if>
                    <div class="footer">
                        Developed by Taorem Lucky Singh &bull; Open in a code editor to view raw XML.
                    </div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>