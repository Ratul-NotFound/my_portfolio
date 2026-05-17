
const fs = require('fs');
const c = fs.readFileSync('c:/Users/USER/Desktop/projects/portfolio/src/components/Portfolio.jsx', 'utf8');

const tagRegex = /<(div|SlideIn|motion\.\w+|section|main|h1|h2|h3|p|span|a|button|Link|ExternalLink|Mail|Github|Linkedin|Terminal|SectionBadge|SectionTitleLine|ParallaxHeading|StatCard|SkillCard|MagneticWrapper|LiveBackground|CustomCursor|MemoNavbar|MemoFooter|AnimatePresence|Circle|Coffee|ChevronRight|ChevronDown|Download|ArrowRight|Code2|Brain|Server|Globe|Zap|Rocket|Star|Award|TrendingUp|Network|Cpu|MapPin|img)(?:\s+[^>]*)?\/?>|<\/(div|SlideIn|motion\.\w+|section|main|h1|h2|h3|p|span|a|button|Link|ExternalLink|Mail|Github|Linkedin|Terminal|SectionBadge|SectionTitleLine|ParallaxHeading|StatCard|SkillCard|MagneticWrapper|LiveBackground|CustomCursor|MemoNavbar|MemoFooter|AnimatePresence|Circle|Coffee|ChevronRight|ChevronDown|Download|ArrowRight|Code2|Brain|Server|Globe|Zap|Rocket|Star|Award|TrendingUp|Network|Cpu|MapPin|img)>/g;

let stack = [];
let lines = c.split('\n');

lines.forEach((line, lineIdx) => {
    let matches = line.match(tagRegex);
    if (matches) {
        matches.forEach(tag => {
            if (tag.startsWith('</')) {
                let name = tag.slice(2, -1);
                if (stack.length === 0) {
                    console.log(`${lineIdx + 1}: Extra close: ${tag}`);
                } else {
                    let last = stack.pop();
                    if (last.name !== name) {
                        console.log(`${lineIdx + 1}: Mismatch: ${last.name} (from line ${last.line}) closed by ${tag}`);
                    }
                }
            } else if (!tag.endsWith('/>')) {
                let nameMatch = tag.match(/<([\w.]+)/);
                if (nameMatch) {
                    stack.push({ name: nameMatch[1], line: lineIdx + 1 });
                }
            }
        });
    }
});

if (stack.length > 0) {
    console.log('Unclosed tags:', stack);
}
