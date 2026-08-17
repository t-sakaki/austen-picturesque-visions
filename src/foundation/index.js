/**
 * Picturesque Visions - Foundation Module
 * 
 * Entry point for importing the Aesthetics Prompt Engine
 * 
 * @example
 * const { generateAestheticsPrompt } = require('./src/foundation');
 * 
 * const result = generateAestheticsPrompt({
 *   sceneDescription: 'a ruined abbey in autumn',
 *   lens: 'picturesque',
 *   workTitle: 'Northanger Abbey'
 * });
 * 
 * console.log(result.prompt.gemini);
 */

const {
  generateAestheticsPrompt,
  readKnowledgeBase,
  LENS_CONFIGS,
  getWorkReferences,
  validateConstraints,
  enhanceWithModifiers,
  getVisualMetaphor
} = require('./aestheticsPromptEngine');

module.exports = {
  // Main function
  generateAestheticsPrompt,
  
  // Knowledge utilities
  readKnowledgeBase,
  
  // Configuration
  LENS_CONFIGS,
  
  // Helper functions
  getWorkReferences,
  validateConstraints,
  enhanceWithModifiers,
  getVisualMetaphor
};