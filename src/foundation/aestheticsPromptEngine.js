/**
 * Aesthetics Prompt Engine
 * 
 * Generates optimized Gemini/BytePlus text prompts based on aesthetic lenses
 * for the Picturesque Visions project.
 * 
 * Reads from knowledge base at /docs/knowledge/*.md and applies lens-specific
 * optimization strategies.
 * 
 * @module aestheticsPromptEngine
 */

const fs = require('fs');
const path = require('path');

/**
 * Lens configuration objects defining prompt optimization strategies
 */
const LENS_CONFIGS = {
  picturesque: {
    lensName: 'Picturesque',
    focusKeywords: ['roughness', 'irregularity', 'variety', 'decay', 'ruins', 'weathered', 'overgrown', 'framing', 'asymmetry'],
    styleModifiers: {
      text: 'textured, weathered, organic',
      color: 'earthy, muted, natural tones',
      composition: 'painterly, compositional, framed',
      mood: 'curious, intellectual, contemplative'
    },
    promptTemplate: 'A visual landscape scene embodying the picturesque aesthetic: {scene_description}. Emphasize {textural_quality}, dramatic {composition}, and the appeal of {decay_element}. The scene should evoke {emotional_response} through asymmetry, natural frames, and the interplay of light and shadow.',
    constraints: [
      'Avoid manicured symmetry',
      'Highlight weathered surfaces and natural erosion',
      'Include compositional framing elements (trees, archways, rock formations)',
      'Balance beauty with intellectual curiosity'
    ]
  },

  socialClass: {
    lensName: 'Social Class',
    focusKeywords: ['estate', 'grounds', 'wealth', 'status', 'values', 'managed', 'wild', 'order', 'opulence', 'decline'],
    styleModifiers: {
      text: 'ordered landscapes, maintained grounds, architectural elements',
      color: 'rich jewel tones for wealth, faded pastels for decline',
      composition: 'frontal, stately, hierarchical',
      mood: 'observant, analytical, discriminating'
    },
    promptTemplate: 'A landscape scene analyzed through the lens of social class. The visual elements reveal the {status_indicator} of the inhabitants through {landscaping_style}. Show {wealth_manifestation} alongside {social_tension}. The scene should encourage an analysis of {moral_dimension} reflected in the environment.',
    constraints: [
      'Visual indicators of wealth: manicured lawns, formal gardens, architectural symmetry',
      'Signs of social status: estate gates, fencing, pavilion structures',
      'Tension between ordered and wild elements',
      'Decay as metaphor for social transition'
    ]
  },

  psychological: {
    lensName: 'Psychological',
    focusKeywords: ['reflection', 'inner state', 'emotion', 'mood', 'mist', 'light', 'shadow', 'wildness', 'order', 'metaphor'],
    styleModifiers: {
      text: 'atmospheric, metaphorical, emotionally resonant',
      color: 'mood-appropriate: warm for hope, cool for melancholy, desaturated for uncertainty',
      composition: 'asymmetrical, emotive, psychologically layered',
      mood: 'introspective, empathetic, emotionally nuanced'
    },
    promptTemplate: 'A landscape scene visualizing internal psychological states. The environment reflects {character_emotion} through {visual_metaphor}. Use {atmospheric_effects} to convey {emotional_depth}. The scene should make the viewer feel the {psychological_theme} without explicit human figures.',
    constraints: [
      'Weather as emotional proxy: mist for uncertainty, storms for turmoil, calm for peace',
      'Light direction and quality reflecting inner states',
      'Natural elements as metaphors (wilting flowers = declining hope, expansive sky = freedom)',
      'Subtle symbolism over explicit representation'
    ]
  }
};

/**
 * Reads all knowledge base markdown files from the specified directory
 * @param {string} knowledgeDir - Path to the knowledge base directory
 * @returns {Object} - Combined knowledge base content with file sources
 */
function readKnowledgeBase(knowledgeDir = path.join(__dirname, '..', '..', 'docs', 'knowledge')) {
  try {
    const files = fs.readdirSync(knowledgeDir);
    const mdFiles = files.filter(f => f.endsWith('.md'));
    
    const knowledge = {
      aesthetics: '',
      landscape: '',
      sources: []
    };
    
    mdFiles.forEach(file => {
      const content = fs.readFileSync(path.join(knowledgeDir, file), 'utf-8');
      knowledge.sources.push(file);
      
      if (file.includes('aesthetics')) {
        knowledge.aesthetics = content;
      } else if (file.includes('landscape')) {
        knowledge.landscape = content;
      }
    });
    
    return knowledge;
  } catch (error) {
    console.warn(`Warning: Could not read knowledge base: ${error.message}`);
    return { aesthetics: '', landscape: '', sources: [] };
  }
}

/**
 * Extends scene description with aesthetic-specific modifiers
 * @param {string} sceneDesc - Base scene description
 * @param {Object} lensConfig - Configuration for the selected lens
 * @returns {string} - Enhanced scene description
 */
function enhanceWithModifiers(sceneDesc, lensConfig) {
  const modifiers = lensConfig.styleModifiers;
  
  return sceneDesc
    .replace('{textural_quality}', modifiers.text)
    .replace('{composition}', modifiers.composition)
    .replace('{decay_element}', 'natural decay and weathering')
    .replace('{emotional_response}', modifiers.mood);
}

/**
 * Maps a work title to relevant knowledge base sections
 * @param {string} workTitle - Jane Austen work title
 * @returns {Object} - Mapped knowledge references
 */
function getWorkReferences(workTitle) {
  const workMap = {
    'pride and prejudice': {
      site: 'Pemberley\'s grounds',
      focus: 'ownership and natural beauty',
      aesthetic: 'authentic, substantial, refined nature'
    },
    'sense and sensibility': {
      site: 'country estates',
      focus: 'emotional volatility vs environmental stability',
      aesthetic: 'wild nature vs ordered social world'
    },
    'northanger abbey': {
      site: 'Northanger Abbey',
      focus: 'gothic parody and picturesque fantasy',
      aesthetic: 'ruins, mystery, atmospheric decay'
    },
    'mansfield park': {
      site: 'Mansfield Park estate',
      focus: 'moral dimension of landscape',
      aesthetic: 'wild vs managed, duty vs abandonment'
    },
    'persuasion': {
      site: 'Lyme Regis coast',
      focus: 'realism of unforgiving nature',
      aesthetic: 'rugged, resilient, lived-in beauty'
    },
    'emma': {
      site: 'Highbury and Hartfield',
      focus: 'social aspiration and environment',
      aesthetic: 'managed gardens, social display, seasonal change'
    }
  };
  
  const normalized = workTitle.toLowerCase();
  return workMap[normalized] || {
    site: 'English countryside',
    focus: 'transitional landscape',
    aesthetic: 'layered natural beauty'
  };
}

/**
 * Validates that all constraints are respected in the generated prompt
 * @param {string} prompt - Generated prompt to validate
 * @param {Object} lensConfig - Lens configuration with constraints
 * @returns {boolean} - Whether constraints are satisfied
 */
function validateConstraints(prompt, lensConfig) {
  // Basic validation - in production, this would use more sophisticated checks
  const hasRequiredElements = lensConfig.focusKeywords.some(keyword => 
    prompt.toLowerCase().includes(keyword) || 
    prompt.toLowerCase().includes(keyword.replace(/s$/g, ''))
  );
  
  return prompt.length > 100 && hasRequiredElements;
}

/**
 * Main function to generate AI-optimized prompts for landscape generation
 * 
 * @param {Object} params - Prompt generation parameters
 * @param {string} params.sceneDescription - Description of the landscape scene
 * @param {string} params.workTitle - Jane Austen work context (optional)
 * @param {string} params.characterEmotion - Dominant emotion/state (Psychological lens)
 * @param {string} params.statusIndicator - Social status element (Social Class lens)
 * @param {string} [params.lens='picturesque'] - Which aesthetic lens to use
 * @param {boolean} [params.forVideo=false] - Whether output will be used for video generation
 * @returns {Object} - Generated prompt with metadata
 */
function generateAestheticsPrompt(params) {
  const {
    sceneDescription = 'a landscape scene',
    workTitle = '',
    characterEmotion = '',
    statusIndicator = '',
    lens = 'picturesque',
    forVideo = false
  } = params;

  // Validate lens parameter
  const validLenses = Object.keys(LENS_CONFIGS);
  if (!validLenses.includes(lens)) {
    throw new Error(`Invalid lens. Must be one of: ${validLenses.join(', ')}`);
  }

  const lensConfig = LENS_CONFIGS[lens];
  const knowledge = readKnowledgeBase();
  const workRefs = workTitle ? getWorkReferences(workTitle) : null;

  // Build prompt based on lens
  let prompt;
  
  switch (lens) {
    case 'picturesque':
      prompt = buildPicturesquePrompt(sceneDescription, lensConfig, workRefs, knowledge);
      break;
    case 'socialClass':
      prompt = buildSocialClassPrompt(sceneDescription, lensConfig, workRefs, knowledge, statusIndicator);
      break;
    case 'psychological':
      prompt = buildPsychologicalPrompt(sceneDescription, lensConfig, workRefs, characterEmotion, knowledge);
      break;
    default:
      prompt = sceneDescription;
  }

  // Add video-specific guidance if needed
  if (forVideo) {
    prompt = enhanceForVideo(prompt, lensConfig);
  }

  // Validate constraints
  const isValid = validateConstraints(prompt, lensConfig);

  // Add Gemini/BytePlus specific optimization tags
  const optimizedPrompt = addAPIOptimizationTags(prompt, lens, knowledge);

  return {
    prompt: optimizedPrompt,
    metadata: {
      lens: lensConfig.lensName,
      workReference: workRefs,
      constraintsMet: isValid,
      knowledgeSources: knowledge.sources,
      forVideo
    }
  };
}

/**
 * Builds a Picturesque-optimized prompt
 */
function buildPicturesquePrompt(sceneDesc, config, workRefs, knowledge) {
  const enhancedDesc = enhanceWithModifiers(sceneDesc, config);
  
  let prompt = config.promptTemplate
    .replace('{scene_description}', sceneDesc)
    .replace('{textural_quality}', config.styleModifiers.text)
    .replace('{composition}', config.styleModifiers.composition)
    .replace('{decay_element}', 'natural weathering and overgrowth')
    .replace('{emotional_response}', config.styleModifiers.mood);

  if (workRefs) {
    prompt += ` Reference: ${workRefs.site} - ${workRefs.focus}.`;
  }

  prompt += ` ${knowledge.aesthetics.substring(0, 500)}`; // Include relevant knowledge

  return prompt;
}

/**
 * Builds a Social Class-optimized prompt
 */
function buildSocialClassPrompt(sceneDesc, config, workRefs, knowledge, statusIndicator = '') {
  let prompt = config.promptTemplate
    .replace('{scene_description}', sceneDesc)
    .replace('{status_indicator}', statusIndicator || 'architectural hierarchy')
    .replace('{landscaping_style}', 'formal, geometric patterns')
    .replace('{wealth_manifestation}', 'symmetrical design, maintained plantings')
    .replace('{social_tension}', 'wild paths breaking through ordered layouts')
    .replace('{moral_dimension}', 'the relationship between cultivation and humanity');

  if (workRefs) {
    prompt += ` Analyze ${workRefs.site} where ${workRefs.focus}.`;
    prompt += ` Aesthetic: ${workRefs.aesthetic}.`;
  }

  prompt += ` Include: ${knowledge.landscape.substring(0, 400)}`;

  return prompt;
}

/**
 * Builds a Psychological-optimized prompt
 */
function buildPsychologicalPrompt(sceneDesc, config, workRefs, characterEmotion, knowledge) {
  const emotion = characterEmotion || 'contemplation';
  const visualMetaphor = getVisualMetaphor(emotion);

  let prompt = config.promptTemplate
    .replace('{scene_description}', sceneDesc)
    .replace('{character_emotion}', emotion)
    .replace('{visual_metaphor}', visualMetaphor.description)
    .replace('{atmospheric_effects}', visualMetaphor.atmosphere)
    .replace('{emotional_depth}', visualMetaphor.depth)
    .replace('{psychological_theme}', visualMetaphor.theme);

  if (workRefs) {
    prompt += ` Through the lens of ${workRefs.focus} in ${workRefs.site}.`;
  }

  prompt += ` ${knowledge.aesthetics.substring(0, 400)}`;

  return prompt;
}

/**
 * Maps emotions to visual metaphors
 */
function getVisualMetaphor(emotion) {
  const metaphors = {
    'hope': {
      description: 'dawn breaking over hills, light filtering through trees',
      atmosphere: 'soft morning light, gentle mist lifting',
      depth: 'the promise of renewal',
      theme: 'forward-looking possibility'
    },
    'melancholy': {
      description: 'wilted flowers, autumn leaves drifting',
      atmosphere: 'overcast sky, distant rain, muted colors',
      depth: 'the beauty of impermanence',
      theme: 'sadness intertwined with beauty'
    },
    'uncertainty': {
      description: 'misty horizons, indistinct shapes',
      atmosphere: 'diffuse light, partially obscured forms',
      depth: 'the unknown beyond the visible',
      theme: 'question without clear answer'
    },
    'contemplation': {
      description: 'still waters, reflected sky, quiet groves',
      atmosphere: 'dappled sunlight, gentle shadows',
      depth: 'the weight of thinking',
      theme: 'peaceful introspection'
    },
    'tension': {
      description: 'storm clouds gathering, dramatic lighting',
      atmosphere: 'darkening sky, chiaroscuro contrasts',
      depth: 'the moment before revelation',
      theme: 'bearing witness to conflict'
    }
  };

  return metaphors[emotion.toLowerCase()] || metaphors['contemplation'];
}

/**
 * Enhances prompt for video generation
 */
function enhanceForVideo(basePrompt, config) {
  const videoGuidance = [
    'Use cinematic composition with depth of field',
    'Include camera movement suggestions: subtle pan, slow zoom, or tracking shot',
    'Add atmospheric details: cloud movement, light changes, seasonal indicators',
    'Specify aspect ratio: 16:9 for landscape video',
    'Consider time of day transitions for narrative progression'
  ];

  return `${basePrompt} Video optimization: ${videoGuidance.join('. ')}`;
}

/**
 * Adds API-specific optimization tags for Gemini and BytePlus Ark
 */
function addAPIOptimizationTags(prompt, lens, knowledge) {
  // Knowledge base integration hint for video generation models
  const knowledgeContext = knowledge.aesthetics.substring(0, 200)
    .split('\n')
    .filter(line => line.trim() && !line.includes('#'))
    .join(' ');

  const apiTags = {
    gemini: {
      systemInstruction: 'You are an aesthetic landscape visualization assistant.',
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        responseMimeType: 'text/plain'
      }
    },
    byteplus: {
      model: 'pro-edit-v1',
      task: 'text_to_image',
      quality: 'high'
    }
  };

  // For Gemini API
  const geminiOptimization = `
---
API: gemini-1.5-flash
System: ${apiTags.gemini.systemInstruction}
Style: ${lens}-focused aesthetic
Knowledge: ${knowledgeContext}
---
${prompt}`;

  // For BytePlus Ark
  const byteplusOptimization = `
---
Model: ${apiTags.byteplus.model}
Task: ${apiTags.byteplus.task}
Quality: ${apiTags.byteplus.quality}
Lens: ${lens}
---
${prompt}`;

  return {
    gemini: geminiOptimization,
    byteplus: byteplusOptimization,
    raw: prompt
  };
}

// Export main function and utilities
module.exports = {
  generateAestheticsPrompt,
  readKnowledgeBase,
  LENS_CONFIGS,
  getWorkReferences,
  validateConstraints,
  enhanceWithModifiers,
  getVisualMetaphor
};

// CLI interface for direct usage
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node aestheticsPromptEngine.js <lens> [options]');
    console.log('Lenses: picturesque, socialClass, psychological');
    console.log('Options: --scene "description" --work "Title" --emotion "state" --video');
    process.exit(1);
  }

  const lens = args[0];
  const options = {};
  
  for (let i = 1; i < args.length; i += 2) {
    const key = args[i].replace('--', '');
    options[key] = args[i + 1];
  }

  try {
    const result = generateAestheticsPrompt({
      sceneDescription: options.scene || 'a pastoral English landscape',
      workTitle: options.work || '',
      characterEmotion: options.emotion || '',
      statusIndicator: options.status || '',
      lens: lens,
      forVideo: options.video === 'true'
    });

    console.log('=== GENERATED PROMPT ===');
    console.log('Lens:', result.metadata.lens);
    console.log('\n--- Gemini Optimized ---');
    console.log(result.prompt.gemini);
    console.log('\n--- BytePlus Optimized ---');
    console.log(result.prompt.byteplus);
    console.log('\n--- Raw ---');
    console.log(result.prompt.raw);
    console.log('\n=== METADATA ===');
    console.log(JSON.stringify(result.metadata, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}