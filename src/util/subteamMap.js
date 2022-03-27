/**
 * @fileoverview Stores a map of the individual title that an executive board
 * member would have corresponding to the larger subteam they are apart of.
 */

const subteamMap = new Map([['Co-President', 'Presidents'],
['Co-Events Chair', 'Events'], ['Co-Outreach Chair', 'Outreach'],
['Co-Design Chair', 'Design'], ['Professional Development Chair', 'Professional'],['Professional Development', 'Professional'],
['Co-Corporate Chair', 'Corporate'], ['Operations Chair', 'Operations'],['Corporate Chair', 'Corporate'],
['Secretary', 'Secretary'], ['Co-Mentorship Chair', 'Mentorship'],['Co-Professional Development Chair', 'Professional'],
['CS Academic Chair', 'Academic'], ['IS Academic Chair', 'Academic'],
['Alumni Chair', 'Alumni'], ['Floater', 'Floater'], ['Freshman Representative', 'Freshman Representative'],
['Co-Academic Chair', 'Academic'],['Full Stack Developer','Other'],['Co-PR Chair', 'Professional Relations']])

module.exports = subteamMap;
