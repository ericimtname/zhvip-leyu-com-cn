// assets/content-map.js

const contentMap = {
  siteUrl: "https://zhvip-leyu.com.cn",
  primaryTag: "乐鱼体育",
  sections: [
    {
      id: "home",
      label: "首页",
      keywords: ["首页", "推荐", "乐鱼体育", "zhvip-leyu.com.cn"],
      subSections: [
        { id: "banner", label: "轮播推荐", tags: ["热点", "乐鱼体育"] },
        { id: "quick-links", label: "快捷入口", tags: ["导航", "乐鱼体育"] }
      ]
    },
    {
      id: "live",
      label: "直播",
      keywords: ["直播", "赛事", "乐鱼体育", "体育直播"],
      subSections: [
        { id: "football", label: "足球", tags: ["足球", "乐鱼体育", "英超"] },
        { id: "basketball", label: "篮球", tags: ["篮球", "NBA", "乐鱼体育"] },
        { id: "esports", label: "电竞", tags: ["电竞", "LOL", "DOTA2", "乐鱼体育"] }
      ]
    },
    {
      id: "news",
      label: "资讯",
      keywords: ["新闻", "资讯", "乐鱼体育", "体育动态"],
      subSections: [
        { id: "transfer", label: "转会", tags: ["转会", "乐鱼体育", "球员"] },
        { id: "match-review", label: "赛事回顾", tags: ["战报", "乐鱼体育", "比分"] }
      ]
    },
    {
      id: "promotions",
      label: "活动",
      keywords: ["活动", "优惠", "乐鱼体育", "福利"],
      subSections: [
        { id: "deposit-bonus", label: "充值奖励", tags: ["充值", "乐鱼体育", "优惠"] },
        { id: "cashback", label: "返水", tags: ["返水", "乐鱼体育", "回馈"] }
      ]
    },
    {
      id: "help",
      label: "帮助",
      keywords: ["帮助", "客服", "乐鱼体育", "常见问题"],
      subSections: [
        { id: "faq", label: "常见问题", tags: ["FAQ", "乐鱼体育", "帮助"] },
        { id: "contact", label: "联系客服", tags: ["客服", "乐鱼体育", "支持"] }
      ]
    }
  ]
};

function searchSections(query) {
  if (!query || query.length === 0) {
    return [];
  }

  const lowerQuery = query.toLowerCase();
  const results = [];

  for (const section of contentMap.sections) {
    let match = false;

    if (section.label.toLowerCase().includes(lowerQuery)) {
      match = true;
    }
    if (section.keywords.some(kw => kw.toLowerCase().includes(lowerQuery))) {
      match = true;
    }
    if (section.tags && section.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) {
      match = true;
    }

    const matchingSubs = [];
    if (section.subSections) {
      for (const sub of section.subSections) {
        let subMatch = false;
        if (sub.label.toLowerCase().includes(lowerQuery)) {
          subMatch = true;
        }
        if (sub.tags && sub.tags.some(tag => tag.toLowerCase().includes(lowerQuery))) {
          subMatch = true;
        }
        if (subMatch) {
          matchingSubs.push(sub);
        }
      }
    }

    if (match || matchingSubs.length > 0) {
      results.push({
        section: section.label,
        sectionId: section.id,
        matchedSubs: matchingSubs
      });
    }
  }

  return results;
}

function filterByTag(tagName) {
  if (!tagName || tagName.length === 0) {
    return [];
  }

  const lowerTag = tagName.toLowerCase();
  const results = [];

  for (const section of contentMap.sections) {
    const subResults = [];
    if (section.subSections) {
      for (const sub of section.subSections) {
        if (sub.tags && sub.tags.some(t => t.toLowerCase() === lowerTag)) {
          subResults.push(sub);
        }
      }
    }

    const sectionSelf = (section.keywords && section.keywords.some(k => k.toLowerCase() === lowerTag)) ||
                        (section.tags && section.tags.some(t => t.toLowerCase() === lowerTag));

    if (sectionSelf || subResults.length > 0) {
      results.push({
        section: section.label,
        sectionId: section.id,
        matchedSubs: subResults
      });
    }
  }

  return results;
}

function buildTagCloud() {
  const tagCount = {};
  for (const section of contentMap.sections) {
    if (section.keywords) {
      section.keywords.forEach(kw => {
        const lower = kw.toLowerCase();
        tagCount[lower] = (tagCount[lower] || 0) + 1;
      });
    }
    if (section.subSections) {
      for (const sub of section.subSections) {
        if (sub.tags) {
          sub.tags.forEach(t => {
            const lower = t.toLowerCase();
            tagCount[lower] = (tagCount[lower] || 0) + 1;
          });
        }
      }
    }
  }
  return tagCount;
}

function getPrimaryTagInfo() {
  const tagCloud = buildTagCloud();
  const primaryTagLower = contentMap.primaryTag.toLowerCase();
  return {
    tag: contentMap.primaryTag,
    site: contentMap.siteUrl,
    occurrence: tagCloud[primaryTagLower] || 0,
    relatedSections: filterByTag(primaryTagLower)
  };
}

console.log("Content map initialized for:", contentMap.siteUrl);
console.log("Primary tag:", contentMap.primaryTag);
console.log("Tag cloud sample:", buildTagCloud());

export { contentMap, searchSections, filterByTag, buildTagCloud, getPrimaryTagInfo };