/**
 * @fileoverview Stores a map of the individual title that an executive board
 * member would have corresponding to the larger subteam they are apart of.
 */

const subteamMap = new Map([['Co-President', 'Presidents'],
['Co-Events Chair', 'Events'], ['Co-Outreach Chair', 'Outreach'],
['Co-Design Chair', 'Design'], ['Professional Development Chair', 'Professional'],
['Co-Corporate Chair', 'Corporate'], ['Operations Chair', 'Operations'],
['Secretary', 'Secretary'], ['Co-Mentorship Chair', 'Mentorship'],
['CS Academic Chair', 'Academic'], ['IS Academic Chair', 'Academic'],
['Alumni Chair', 'Alumni'], ['Floater', 'Floater'], ['Freshman Representative', 'Freshman Representative'], ['Co-PR Chair', 'Professional Relations']])

module.exports = subteamMap;
