ace.define("ace/mode/doc_comment_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules"], function(e, t, n) {
    "use strict";
    var r = e("../lib/oop"),
        i = e("./text_highlight_rules").TextHighlightRules,
        s = function() {
            this.$rules = {
                start: [{
                        token: "comment.doc.tag",
                        regex: "@[\\w\\d_]+"
                    },
                    s.getTagRule(), {
                        defaultToken: "comment.doc",
                        caseInsensitive: !0
                    }
                ]
            }
        };
    r.inherits(s, i), s.getTagRule = function(e) {
        return {
            token: "comment.doc.tag.storage.type",
            regex: "\\b(?:TODO|FIXME|XXX|HACK)\\b"
        }
    }, s.getStartRule = function(e) {
        return {
            token: "comment.doc",
            regex: "\\/\\*(?=\\*)",
            next: e
        }
    }, s.getEndRule = function(e) {
        return {
            token: "comment.doc",
            regex: "\\*\\/",
            next: e
        }
    }, t.DocCommentHighlightRules = s
}), ace.define("ace/mode/javascript_highlight_rules", ["require", "exports", "module", "ace/lib/oop", "ace/mode/doc_comment_highlight_rules", "ace/mode/text_highlight_rules"], function(e, t, n) {
    "use strict";

    function a() {
        var e = o.replace("\\d", "\\d\\-"),
            t = {
                onMatch: function(e, t, n) {
                    var r = e.charAt(1) == "/" ? 2 : 1;
                    if (r == 1) t != this.nextState ? n.unshift(this.next, this.nextState, 0) : n.unshift(this.next), n[2]++;
                    else if (r == 2 && t == this.nextState) {
                        n[1]--;
                        if (!n[1] || n[1] < 0) n.shift(), n.shift()
                    }
                    return [{
                        type: "meta.tag.punctuation." + (r == 1 ? "" : "end-") + "tag-open.xml",
                        value: e.slice(0, r)
                    }, {
                        type: "meta.tag.tag-name.xml",
                        value: e.substr(r)
                    }]
                },
                regex: "</?" + e + "",
                next: "jsxAttributes",
                nextState: "jsx"
            };
        this.$rules.start.unshift(t);
        var n = {
            regex: "{",
            token: "paren.quasi.start",
            push: "start"
        };
        this.$rules.jsx = [n, t, {
            include: "reference"
        }, {
            defaultToken: "string"
        }], this.$rules.jsxAttributes = [{
                token: "meta.tag.punctuation.tag-close.xml",
                regex: "/?>",
                onMatch: function(e, t, n) {
                    return t == n[0] && n.shift(), e.length == 2 && (n[0] == this.nextState && n[1]--, (!n[1] || n[1] < 0) && n.splice(0, 2)), this.next = n[0] || "start", [{
                        type: this.token,
                        value: e
                    }]
                },
                nextState: "jsx"
            },
            n, {
                token: "entity.other.attribute-name.xml",
                regex: e
            }, {
                token: "keyword.operator.attribute-equals.xml",
                regex: "="
            }, {
                token: "text.tag-whitespace.xml",
                regex: "\\s+"
            }, {
                token: "string.attribute-value.xml",
                regex: "'",
                stateName: "jsx_attr_q",
                push: [{
                        token: "string.attribute-value.xml",
                        regex: "'",
                        next: "pop"
                    },
                    n, {
                        include: "reference"
                    }, {
                        defaultToken: "string.attribute-value.xml"
                    }
                ]
            }, {
                token: "string.attribute-value.xml",
                regex: '"',
                stateName: "jsx_attr_qq",
                push: [n, {
                    token: "string.attribute-value.xml",
                    regex: '"',
                    next: "pop"
                }, {
                    include: "reference"
                }, {
                    defaultToken: "string.attribute-value.xml"
                }]
            }
        ], this.$rules.reference = [{
            token: "constant.language.escape.reference.xml",
            regex: "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
        }]
    }
    var r = e("../lib/oop"),
        i = e("./doc_comment_highlight_rules").DocCommentHighlightRules,
        s = e("./text_highlight_rules").TextHighlightRules,
        o = "[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*\\b",
        u = function(e) {
            var t = this.createKeywordMapper({
                    "variable.language": "",
                    keyword: "break|case|default||else|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|PINA|PINB|PINC|PIND|PINE|PINF|OUTPUT|INPUT|HIGH|LOW",
                    "storage.type": "var|function",
                    "constant.language": "null|undefined",
                    "support.function": "pinMode|digitalWrite|digitalRead|analogRead|analogWrite|Serial3|Serial3.beign|Serial3.print|Serial3.read|Delay",
                    "constant.language.boolean": "true|false"
                }, "identifier"),
                n = "case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void",
                r = "\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)";
            this.$rules = {
                no_regex: [{
                        token: "comment",
                        regex: "\\/\\/",
                        next: "line_comment"
                    },
                    i.getStartRule("doc-start"), {
                        token: "comment",
                        regex: /\/\*/,
                        next: "comment"
                    }, {
                        token: "string",
                        regex: "'(?=.)",
                        next: "qstring"
                    }, {
                        token: "string",
                        regex: '"(?=.)',
                        next: "qqstring"
                    }, {
                        token: "constant.numeric",
                        regex: /0[xX][0-9a-fA-F]+\b/
                    }, {
                        token: "constant.numeric",
                        regex: /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
                    }, {
                        token: ["storage.type", "punctuation.operator", "support.function", "punctuation.operator", "entity.name.function", "text", "keyword.operator"],
                        regex: "(" + o + ")(\\.)(prototype)(\\.)(" + o + ")(\\s*)(=)",
                        next: "function_arguments"
                    }, {
                        token: ["storage.type", "punctuation.operator", "entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "paren.lparen"],
                        regex: "(" + o + ")(\\.)(" + o + ")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",
                        next: "function_arguments"
                    }, {
                        token: ["entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "paren.lparen"],
                        regex: "(" + o + ")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",
                        next: "function_arguments"
                    }, {
                        token: ["storage.type", "punctuation.operator", "entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "entity.name.function", "text", "paren.lparen"],
                        regex: "(" + o + ")(\\.)(" + o + ")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",
                        next: "function_arguments"
                    }, {
                        token: ["storage.type", "text", "entity.name.function", "text", "paren.lparen"],
                        regex: "(function)(\\s+)(" + o + ")(\\s*)(\\()",
                        next: "function_arguments"
                    }, {
                        token: ["entity.name.function", "text", "punctuation.operator", "text", "storage.type", "text", "paren.lparen"],
                        regex: "(" + o + ")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",
                        next: "function_arguments"
                    }, {
                        token: ["text", "text", "storage.type", "text", "paren.lparen"],
                        regex: "(:)(\\s*)(function)(\\s*)(\\()",
                        next: "function_arguments"
                    }, {
                        token: "keyword",
                        regex: "(?:" + n + ")\\b",
                        next: "start"
                    }, {
                        token: ["support.constant"],
                        regex: /that\b/
                    }, {
                        token: ["storage.type", "punctuation.operator", "support.function.firebug"],
                        regex: /(console)(\.)(warn|info|log|error|time|trace|timeEnd|assert)\b/
                    }, {
                        token: t,
                        regex: o
                    }, {
                        token: "punctuation.operator",
                        regex: /[.](?![.])/,
                        next: "property"
                    }, {
                        token: "keyword.operator",
                        regex: /--|\+\+|\.{3}|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|[!$%&*+\-~\/^]=?/,
                        next: "start"
                    }, {
                        token: "punctuation.operator",
                        regex: /[?:,;.]/,
                        next: "start"
                    }, {
                        token: "paren.lparen",
                        regex: /[\[({]/,
                        next: "start"
                    }, {
                        token: "paren.rparen",
                        regex: /[\])}]/
                    }, {
                        token: "comment",
                        regex: /^#!.*$/
                    }
                ],
                property: [{
                    token: "text",
                    regex: "\\s+"
                }, {
                    token: ["storage.type", "punctuation.operator", "entity.name.function", "text", "keyword.operator", "text", "storage.type", "text", "entity.name.function", "text", "paren.lparen"],
                    regex: "(" + o + ")(\\.)(" + o + ")(\\s*)(=)(\\s*)(function)(?:(\\s+)(\\w+))?(\\s*)(\\()",
                    next: "function_arguments"
                }, {
                    token: "punctuation.operator",
                    regex: /[.](?![.])/
                }, {
                    token: "support.function",
                    regex: /(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/
                }, {
                    token: "support.function.dom",
                    regex: /(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/
                }, {
                    token: "support.constant",
                    regex: /(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/
                }, {
                    token: "identifier",
                    regex: o
                }, {
                    regex: "",
                    token: "empty",
                    next: "no_regex"
                }],
                start: [i.getStartRule("doc-start"), {
                    token: "comment",
                    regex: "\\/\\*",
                    next: "comment_regex_allowed"
                }, {
                    token: "comment",
                    regex: "\\/\\/",
                    next: "line_comment_regex_allowed"
                }, {
                    token: "string.regexp",
                    regex: "\\/",
                    next: "regex"
                }, {
                    token: "text",
                    regex: "\\s+|^$",
                    next: "start"
                }, {
                    token: "empty",
                    regex: "",
                    next: "no_regex"
                }],
                regex: [{
                    token: "regexp.keyword.operator",
                    regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
                }, {
                    token: "string.regexp",
                    regex: "/[sxngimy]*",
                    next: "no_regex"
                }, {
                    token: "invalid",
                    regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/
                }, {
                    token: "constant.language.escape",
                    regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/
                }, {
                    token: "constant.language.delimiter",
                    regex: /\|/
                }, {
                    token: "constant.language.escape",
                    regex: /\[\^?/,
                    next: "regex_character_class"
                }, {
                    token: "empty",
                    regex: "$",
                    next: "no_regex"
                }, {
                    defaultToken: "string.regexp"
                }],
                regex_character_class: [{
                    token: "regexp.charclass.keyword.operator",
                    regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
                }, {
                    token: "constant.language.escape",
                    regex: "]",
                    next: "regex"
                }, {
                    token: "constant.language.escape",
                    regex: "-"
                }, {
                    token: "empty",
                    regex: "$",
                    next: "no_regex"
                }, {
                    defaultToken: "string.regexp.charachterclass"
                }],
                function_arguments: [{
                    token: "variable.parameter",
                    regex: o
                }, {
                    token: "punctuation.operator",
                    regex: "[, ]+"
                }, {
                    token: "punctuation.operator",
                    regex: "$"
                }, {
                    token: "empty",
                    regex: "",
                    next: "no_regex"
                }],
                comment_regex_allowed: [i.getTagRule(), {
                    token: "comment",
                    regex: "\\*\\/",
                    next: "start"
                }, {
                    defaultToken: "comment",
                    caseInsensitive: !0
                }],
                comment: [i.getTagRule(), {
                    token: "comment",
                    regex: "\\*\\/",
                    next: "no_regex"
                }, {
                    defaultToken: "comment",
                    caseInsensitive: !0
                }],
                line_comment_regex_allowed: [i.getTagRule(), {
                    token: "comment",
                    regex: "$|^",
                    next: "start"
                }, {
                    defaultToken: "comment",
                    caseInsensitive: !0
                }],
                line_comment: [i.getTagRule(), {
                    token: "comment",
                    regex: "$|^",
                    next: "no_regex"
                }, {
                    defaultToken: "comment",
                    caseInsensitive: !0
                }],
                qqstring: [{
                    token: "constant.language.escape",
                    regex: r
                }, {
                    token: "string",
                    regex: "\\\\$",
                    next: "qqstring"
                }, {
                    token: "string",
                    regex: '"|$',
                    next: "no_regex"
                }, {
                    defaultToken: "string"
                }],
                qstring: [{
                    token: "constant.language.escape",
                    regex: r
                }, {
                    token: "string",
                    regex: "\\\\$",
                    next: "qstring"
                }, {
                    token: "string",
                    regex: "'|$",
                    next: "no_regex"
                }, {
                    defaultToken: "string"
                }]
            };
            if (!e || !e.noES6) this.$rules.no_regex.unshift({
                regex: "[{}]",
                onMatch: function(e, t, n) {
                    this.next = e == "{" ? this.nextState : "";
                    if (e == "{" && n.length) return n.unshift("start", t), "paren";
                    if (e == "}" && n.length) {
                        n.shift(), this.next = n.shift();
                        if (this.next.indexOf("string") != -1 || this.next.indexOf("jsx") != -1) return "paren.quasi.end"
                    }
                    return e == "{" ? "paren.lparen" : "paren.rparen"
                },
                nextState: "start"
            }, {
                token: "string.quasi.start",
                regex: /`/,
                push: [{
                    token: "constant.language.escape",
                    regex: r
                }, {
                    token: "paren.quasi.start",
                    regex: /\${/,
                    push: "start"
                }, {
                    token: "string.quasi.end",
                    regex: /`/,
                    next: "pop"
                }, {
                    defaultToken: "string.quasi"
                }]
            }), (!e || !e.noJSX) && a.call(this);
            this.embedRules(i, "doc-", [i.getEndRule("no_regex")]), this.normalizeRules()
        };
    r.inherits(u, s), t.JavaScriptHighlightRules = u
}), ace.define("ace/mode/matching_brace_outdent", ["require", "exports", "module", "ace/range"], function(e, t, n) {
    "use strict";
    var r = e("../range").Range,
        i = function() {};
    (function() {
        this.checkOutdent = function(e, t) {
            return /^\s+$/.test(e) ? /^\s*\}/.test(t) : !1
        }, this.autoOutdent = function(e, t) {
            var n = e.getLine(t),
                i = n.match(/^(\s*\})/);
            if (!i) return 0;
            var s = i[1].length,
                o = e.findMatchingBracket({
                    row: t,
                    column: s
                });
            if (!o || o.row == t) return 0;
            var u = this.$getIndent(e.getLine(o.row));
            e.replace(new r(t, 0, t, s - 1), u)
        }, this.$getIndent = function(e) {
            return e.match(/^\s*/)[0]
        }
    }).call(i.prototype), t.MatchingBraceOutdent = i
}), ace.define("ace/mode/behaviour/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/token_iterator", "ace/lib/lang"], function(e, t, n) {
    "use strict";
    var r = e("../../lib/oop"),
        i = e("../behaviour").Behaviour,
        s = e("../../token_iterator").TokenIterator,
        o = e("../../lib/lang"),
        u = ["text", "paren.rparen", "punctuation.operator"],
        a = ["text", "paren.rparen", "punctuation.operator", "comment"],
        f, l = {},
        c = function(e) {
            var t = -1;
            e.multiSelect && (t = e.selection.index, l.rangeCount != e.multiSelect.rangeCount && (l = {
                rangeCount: e.multiSelect.rangeCount
            }));
            if (l[t]) return f = l[t];
            f = l[t] = {
                autoInsertedBrackets: 0,
                autoInsertedRow: -1,
                autoInsertedLineEnd: "",
                maybeInsertedBrackets: 0,
                maybeInsertedRow: -1,
                maybeInsertedLineStart: "",
                maybeInsertedLineEnd: ""
            }
        },
        h = function(e, t, n, r) {
            var i = e.end.row - e.start.row;
            return {
                text: n + t + r,
                selection: [0, e.start.column + 1, i, e.end.column + (i ? 0 : 1)]
            }
        },
        p = function() {
            this.add("braces", "insertion", function(e, t, n, r, i) {
                var s = n.getCursorPosition(),
                    u = r.doc.getLine(s.row);
                if (i == "{") {
                    c(n);
                    var a = n.getSelectionRange(),
                        l = r.doc.getTextRange(a);
                    if (l !== "" && l !== "{" && n.getWrapBehavioursEnabled()) return h(a, l, "{", "}");
                    if (p.isSaneInsertion(n, r)) return /[\]\}\)]/.test(u[s.column]) || n.inMultiSelectMode ? (p.recordAutoInsert(n, r, "}"), {
                        text: "{}",
                        selection: [1, 1]
                    }) : (p.recordMaybeInsert(n, r, "{"), {
                        text: "{",
                        selection: [1, 1]
                    })
                } else if (i == "}") {
                    c(n);
                    var d = u.substring(s.column, s.column + 1);
                    if (d == "}") {
                        var v = r.$findOpeningBracket("}", {
                            column: s.column + 1,
                            row: s.row
                        });
                        if (v !== null && p.isAutoInsertedClosing(s, u, i)) return p.popAutoInsertedClosing(), {
                            text: "",
                            selection: [1, 1]
                        }
                    }
                } else {
                    if (i == "\n" || i == "\r\n") {
                        c(n);
                        var m = "";
                        p.isMaybeInsertedClosing(s, u) && (m = o.stringRepeat("}", f.maybeInsertedBrackets), p.clearMaybeInsertedClosing());
                        var d = u.substring(s.column, s.column + 1);
                        if (d === "}") {
                            var g = r.findMatchingBracket({
                                row: s.row,
                                column: s.column + 1
                            }, "}");
                            if (!g) return null;
                            var y = this.$getIndent(r.getLine(g.row))
                        } else {
                            if (!m) {
                                p.clearMaybeInsertedClosing();
                                return
                            }
                            var y = this.$getIndent(u)
                        }
                        var b = y + r.getTabString();
                        return {
                            text: "\n" + b + "\n" + y + m,
                            selection: [1, b.length, 1, b.length]
                        }
                    }
                    p.clearMaybeInsertedClosing()
                }
            }), this.add("braces", "deletion", function(e, t, n, r, i) {
                var s = r.doc.getTextRange(i);
                if (!i.isMultiLine() && s == "{") {
                    c(n);
                    var o = r.doc.getLine(i.start.row),
                        u = o.substring(i.end.column, i.end.column + 1);
                    if (u == "}") return i.end.column++, i;
                    f.maybeInsertedBrackets--
                }
            }), this.add("parens", "insertion", function(e, t, n, r, i) {
                if (i == "(") {
                    c(n);
                    var s = n.getSelectionRange(),
                        o = r.doc.getTextRange(s);
                    if (o !== "" && n.getWrapBehavioursEnabled()) return h(s, o, "(", ")");
                    if (p.isSaneInsertion(n, r)) return p.recordAutoInsert(n, r, ")"), {
                        text: "()",
                        selection: [1, 1]
                    }
                } else if (i == ")") {
                    c(n);
                    var u = n.getCursorPosition(),
                        a = r.doc.getLine(u.row),
                        f = a.substring(u.column, u.column + 1);
                    if (f == ")") {
                        var l = r.$findOpeningBracket(")", {
                            column: u.column + 1,
                            row: u.row
                        });
                        if (l !== null && p.isAutoInsertedClosing(u, a, i)) return p.popAutoInsertedClosing(), {
                            text: "",
                            selection: [1, 1]
                        }
                    }
                }
            }), this.add("parens", "deletion", function(e, t, n, r, i) {
                var s = r.doc.getTextRange(i);
                if (!i.isMultiLine() && s == "(") {
                    c(n);
                    var o = r.doc.getLine(i.start.row),
                        u = o.substring(i.start.column + 1, i.start.column + 2);
                    if (u == ")") return i.end.column++, i
                }
            }), this.add("brackets", "insertion", function(e, t, n, r, i) {
                if (i == "[") {
                    c(n);
                    var s = n.getSelectionRange(),
                        o = r.doc.getTextRange(s);
                    if (o !== "" && n.getWrapBehavioursEnabled()) return h(s, o, "[", "]");
                    if (p.isSaneInsertion(n, r)) return p.recordAutoInsert(n, r, "]"), {
                        text: "[]",
                        selection: [1, 1]
                    }
                } else if (i == "]") {
                    c(n);
                    var u = n.getCursorPosition(),
                        a = r.doc.getLine(u.row),
                        f = a.substring(u.column, u.column + 1);
                    if (f == "]") {
                        var l = r.$findOpeningBracket("]", {
                            column: u.column + 1,
                            row: u.row
                        });
                        if (l !== null && p.isAutoInsertedClosing(u, a, i)) return p.popAutoInsertedClosing(), {
                            text: "",
                            selection: [1, 1]
                        }
                    }
                }
            }), this.add("brackets", "deletion", function(e, t, n, r, i) {
                var s = r.doc.getTextRange(i);
                if (!i.isMultiLine() && s == "[") {
                    c(n);
                    var o = r.doc.getLine(i.start.row),
                        u = o.substring(i.start.column + 1, i.start.column + 2);
                    if (u == "]") return i.end.column++, i
                }
            }), this.add("string_dquotes", "insertion", function(e, t, n, r, i) {
                if (i == '"' || i == "'") {
                    c(n);
                    var s = i,
                        o = n.getSelectionRange(),
                        u = r.doc.getTextRange(o);
                    if (u !== "" && u !== "'" && u != '"' && n.getWrapBehavioursEnabled()) return h(o, u, s, s);
                    if (!u) {
                        var a = n.getCursorPosition(),
                            f = r.doc.getLine(a.row),
                            l = f.substring(a.column - 1, a.column),
                            p = f.substring(a.column, a.column + 1),
                            d = r.getTokenAt(a.row, a.column),
                            v = r.getTokenAt(a.row, a.column + 1);
                        if (l == "\\" && d && /escape/.test(d.type)) return null;
                        var m = d && /string|escape/.test(d.type),
                            g = !v || /string|escape/.test(v.type),
                            y;
                        if (p == s) y = m !== g;
                        else {
                            if (m && !g) return null;
                            if (m && g) return null;
                            var b = r.$mode.tokenRe;
                            b.lastIndex = 0;
                            var w = b.test(l);
                            b.lastIndex = 0;
                            var E = b.test(l);
                            if (w || E) return null;
                            if (p && !/[\s;,.})\]\\]/.test(p)) return null;
                            y = !0
                        }
                        return {
                            text: y ? s + s : "",
                            selection: [1, 1]
                        }
                    }
                }
            }), this.add("string_dquotes", "deletion", function(e, t, n, r, i) {
                var s = r.doc.getTextRange(i);
                if (!i.isMultiLine() && (s == '"' || s == "'")) {
                    c(n);
                    var o = r.doc.getLine(i.start.row),
                        u = o.substring(i.start.column + 1, i.start.column + 2);
                    if (u == s) return i.end.column++, i
                }
            })
        };
    p.isSaneInsertion = function(e, t) {
        var n = e.getCursorPosition(),
            r = new s(t, n.row, n.column);
        if (!this.$matchTokenType(r.getCurrentToken() || "text", u)) {
            var i = new s(t, n.row, n.column + 1);
            if (!this.$matchTokenType(i.getCurrentToken() || "text", u)) return !1
        }
        return r.stepForward(), r.getCurrentTokenRow() !== n.row || this.$matchTokenType(r.getCurrentToken() || "text", a)
    }, p.$matchTokenType = function(e, t) {
        return t.indexOf(e.type || e) > -1
    }, p.recordAutoInsert = function(e, t, n) {
        var r = e.getCursorPosition(),
            i = t.doc.getLine(r.row);
        this.isAutoInsertedClosing(r, i, f.autoInsertedLineEnd[0]) || (f.autoInsertedBrackets = 0), f.autoInsertedRow = r.row, f.autoInsertedLineEnd = n + i.substr(r.column), f.autoInsertedBrackets++
    }, p.recordMaybeInsert = function(e, t, n) {
        var r = e.getCursorPosition(),
            i = t.doc.getLine(r.row);
        this.isMaybeInsertedClosing(r, i) || (f.maybeInsertedBrackets = 0), f.maybeInsertedRow = r.row, f.maybeInsertedLineStart = i.substr(0, r.column) + n, f.maybeInsertedLineEnd = i.substr(r.column), f.maybeInsertedBrackets++
    }, p.isAutoInsertedClosing = function(e, t, n) {
        return f.autoInsertedBrackets > 0 && e.row === f.autoInsertedRow && n === f.autoInsertedLineEnd[0] && t.substr(e.column) === f.autoInsertedLineEnd
    }, p.isMaybeInsertedClosing = function(e, t) {
        return f.maybeInsertedBrackets > 0 && e.row === f.maybeInsertedRow && t.substr(e.column) === f.maybeInsertedLineEnd && t.substr(0, e.column) == f.maybeInsertedLineStart
    }, p.popAutoInsertedClosing = function() {
        f.autoInsertedLineEnd = f.autoInsertedLineEnd.substr(1), f.autoInsertedBrackets--
    }, p.clearMaybeInsertedClosing = function() {
        f && (f.maybeInsertedBrackets = 0, f.maybeInsertedRow = -1)
    }, r.inherits(p, i), t.CstyleBehaviour = p
}), ace.define("ace/mode/folding/cstyle", ["require", "exports", "module", "ace/lib/oop", "ace/range", "ace/mode/folding/fold_mode"], function(e, t, n) {
    "use strict";
    var r = e("../../lib/oop"),
        i = e("../../range").Range,
        s = e("./fold_mode").FoldMode,
        o = t.FoldMode = function(e) {
            e && (this.foldingStartMarker = new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + e.start)), this.foldingStopMarker = new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + e.end)))
        };
    r.inherits(o, s),
    function() {
        this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/, this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/, this.singleLineBlockCommentRe = /^\s*(\/\*).*\*\/\s*$/, this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/, this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/, this._getFoldWidgetBase = this.getFoldWidget, this.getFoldWidget = function(e, t, n) {
            var r = e.getLine(n);
            if (this.singleLineBlockCommentRe.test(r) && !this.startRegionRe.test(r) && !this.tripleStarBlockCommentRe.test(r)) return "";
            var i = this._getFoldWidgetBase(e, t, n);
            return !i && this.startRegionRe.test(r) ? "start" : i
        }, this.getFoldWidgetRange = function(e, t, n, r) {
            var i = e.getLine(n);
            if (this.startRegionRe.test(i)) return this.getCommentRegionBlock(e, i, n);
            var s = i.match(this.foldingStartMarker);
            if (s) {
                var o = s.index;
                if (s[1]) return this.openingBracketBlock(e, s[1], n, o);
                var u = e.getCommentFoldRange(n, o + s[0].length, 1);
                return u && !u.isMultiLine() && (r ? u = this.getSectionRange(e, n) : t != "all" && (u = null)), u
            }
            if (t === "markbegin") return;
            var s = i.match(this.foldingStopMarker);
            if (s) {
                var o = s.index + s[0].length;
                return s[1] ? this.closingBracketBlock(e, s[1], n, o) : e.getCommentFoldRange(n, o, -1)
            }
        }, this.getSectionRange = function(e, t) {
            var n = e.getLine(t),
                r = n.search(/\S/),
                s = t,
                o = n.length;
            t += 1;
            var u = t,
                a = e.getLength();
            while (++t < a) {
                n = e.getLine(t);
                var f = n.search(/\S/);
                if (f === -1) continue;
                if (r > f) break;
                var l = this.getFoldWidgetRange(e, "all", t);
                if (l) {
                    if (l.start.row <= s) break;
                    if (l.isMultiLine()) t = l.end.row;
                    else if (r == f) break
                }
                u = t
            }
            return new i(s, o, u, e.getLine(u).length)
        }, this.getCommentRegionBlock = function(e, t, n) {
            var r = t.search(/\s*$/),
                s = e.getLength(),
                o = n,
                u = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,
                a = 1;
            while (++n < s) {
                t = e.getLine(n);
                var f = u.exec(t);
                if (!f) continue;
                f[1] ? a-- : a++;
                if (!a) break
            }
            var l = n;
            if (l > o) return new i(o, r, l, t.length)
        }
    }.call(o.prototype)
}), ace.define("ace/mode/javascript", ["require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/javascript_highlight_rules", "ace/mode/matching_brace_outdent", "ace/range", "ace/worker/worker_client", "ace/mode/behaviour/cstyle", "ace/mode/folding/cstyle"], function(e, t, n) {
    "use strict";
    var r = e("../lib/oop"),
        i = e("./text").Mode,
        s = e("./javascript_highlight_rules").JavaScriptHighlightRules,
        o = e("./matching_brace_outdent").MatchingBraceOutdent,
        u = e("../range").Range,
        a = e("../worker/worker_client").WorkerClient,
        f = e("./behaviour/cstyle").CstyleBehaviour,
        l = e("./folding/cstyle").FoldMode,
        c = function() {
            this.HighlightRules = s, this.$outdent = new o, this.$behaviour = new f, this.foldingRules = new l
        };
    r.inherits(c, i),
    function() {
        this.lineCommentStart = "//", this.blockComment = {
            start: "/*",
            end: "*/"
        }, this.getNextLineIndent = function(e, t, n) {
            var r = this.$getIndent(t),
                i = this.getTokenizer().getLineTokens(t, e),
                s = i.tokens,
                o = i.state;
            if (s.length && s[s.length - 1].type == "comment") return r;
            if (e == "start" || e == "no_regex") {
                var u = t.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/);
                u && (r += n)
            } else if (e == "doc-start") {
                if (o == "start" || o == "no_regex") return "";
                var u = t.match(/^\s*(\/?)\*/);
                u && (u[1] && (r += " "), r += "* ")
            }
            return r
        }, this.checkOutdent = function(e, t, n) {
            return this.$outdent.checkOutdent(t, n)
        }, this.autoOutdent = function(e, t, n) {
            this.$outdent.autoOutdent(t, n)
        }, this.createWorker = function(e) {
            var t = new a(["ace"], "ace/mode/javascript_worker", "JavaScriptWorker");
            return t.attachToDocument(e.getDocument()), t.on("annotate", function(t) {
                e.setAnnotations(t.data)
            }), t.on("terminate", function() {
                e.clearAnnotations()
            }), t
        }, this.$id = "ace/mode/javascript"
    }.call(c.prototype), t.Mode = c
})