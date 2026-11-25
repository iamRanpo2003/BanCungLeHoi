import { CommunityStory, FestivalEvent } from '../types/festival';
import {
  AUTHORITATIVE_SOURCES,
  LEGAL_DOCUMENTS,
  MEDIA_AND_ETHICS_CREDITS,
} from './legalReferences';
import { FESTIVALS_DATA } from './festivalsData';
import { INITIAL_STORIES } from './communityData';
import { getMediaAttribution } from '../utils/mediaAttribution';
import { isValidPublicUrl } from '../utils/urlValidator';

export const MISSING_SOURCE_LABEL = '[CẦN BỔ SUNG]';

export type SourceEntryCategory =
  | 'official-portal'
  | 'legal-document'
  | 'festival-dossier'
  | 'media-photo'
  | 'algorithm-tech';

export interface RegistrySourceEntry {
  id: string;
  category: SourceEntryCategory;
  name: string;
  nameEn: string;
  publisher: string;
  year: string;
  url: string;
}

export interface ContributorAcknowledgment {
  id: string;
  contributorName: string;
  role: string;
  contribution: string;
  sourceReference: string;
  year: string;
  url: string;
  isSample: boolean;
}

function normalizeYearFromText(raw?: string): string {
  if (!raw || !raw.trim()) return MISSING_SOURCE_LABEL;
  return raw.trim();
}

export function buildAllAppSources(
  events: FestivalEvent[] = FESTIVALS_DATA
): RegistrySourceEntry[] {
  const entries: RegistrySourceEntry[] = [];

  // 1. Official Government / UNESCO Portals
  for (const src of AUTHORITATIVE_SOURCES) {
    entries.push({
      id: `portal-${src.id}`,
      category: 'official-portal',
      name: src.name,
      nameEn: src.nameEn,
      publisher: src.organization || MISSING_SOURCE_LABEL,
      year: MISSING_SOURCE_LABEL, // AuthoritativeSource records do not carry a year in code
      url: isValidPublicUrl(src.url) ? src.url : MISSING_SOURCE_LABEL,
    });
  }

  // 2. Legal Documents & International Conventions
  for (const doc of LEGAL_DOCUMENTS) {
    entries.push({
      id: `legal-${doc.id}`,
      category: 'legal-document',
      name: `${doc.code} — ${doc.title}`,
      nameEn: `${doc.code} — ${doc.title}`,
      publisher: doc.issuingBody || MISSING_SOURCE_LABEL,
      year: normalizeYearFromText(doc.date),
      url: doc.linkRef && isValidPublicUrl(doc.linkRef) ? doc.linkRef : MISSING_SOURCE_LABEL,
    });
  }

  // 3. Per-festival Legal Dossiers (URLs per specific decision are not stored in festivalsData -> [CẦN BỔ SUNG])
  for (const ev of events) {
    entries.push({
      id: `dossier-${ev.id}`,
      category: 'festival-dossier',
      name: `${ev.name} (${ev.legalBasis.documentNumber || MISSING_SOURCE_LABEL})`,
      nameEn: `${ev.en?.name || ev.name} (${ev.legalBasis.documentNumber || MISSING_SOURCE_LABEL})`,
      publisher: ev.legalBasis.issuingAuthority?.trim() || MISSING_SOURCE_LABEL,
      year: normalizeYearFromText(ev.legalBasis.issueDate),
      url: MISSING_SOURCE_LABEL,
    });
  }

  // 4. Algorithm, Audio & Licensing Credits
  for (const credit of MEDIA_AND_ETHICS_CREDITS) {
    let publisher = MISSING_SOURCE_LABEL;
    if (credit.id === 'credit-photos') publisher = 'Pexels';
    if (credit.id === 'credit-algorithm') publisher = 'Jean Meeus & TS. Hồ Ngọc Đức';

    entries.push({
      id: `tech-${credit.id}`,
      category: 'algorithm-tech',
      name: credit.titleVi,
      nameEn: credit.titleEn,
      publisher,
      year: MISSING_SOURCE_LABEL,
      url: credit.url && isValidPublicUrl(credit.url) ? credit.url : MISSING_SOURCE_LABEL,
    });
  }

  // 5. Real Illustrative Photography used on Festival Cards (Year not declared in Pexels image URLs -> [CẦN BỔ SUNG])
  for (const ev of events) {
    const attr = getMediaAttribution(ev.imageUrl, ev.imageSourceNote);
    entries.push({
      id: `photo-fest-${ev.id}`,
      category: 'media-photo',
      name: attr.photoId
        ? `Ảnh minh họa: ${ev.name} (Pexels #${attr.photoId})`
        : `Ảnh minh họa: ${ev.name}`,
      nameEn: attr.photoId
        ? `Illustrative photo: ${ev.en?.name || ev.name} (Pexels #${attr.photoId})`
        : `Illustrative photo: ${ev.en?.name || ev.name}`,
      publisher: attr.provider === 'Custom' ? MISSING_SOURCE_LABEL : attr.provider,
      year: MISSING_SOURCE_LABEL,
      url: attr.sourceUrl && isValidPublicUrl(attr.sourceUrl) ? attr.sourceUrl : MISSING_SOURCE_LABEL,
    });
  }

  return entries;
}

export function buildContributorAcknowledgments(
  stories: CommunityStory[] = INITIAL_STORIES
): ContributorAcknowledgment[] {
  const list: ContributorAcknowledgment[] = [];

  for (const story of stories) {
    const refText = story.sourceReference?.trim() || MISSING_SOURCE_LABEL;
    const urlMatch = refText.match(/https?:\/\/[^\s)]+/i);
    const extractedUrl = urlMatch && isValidPublicUrl(urlMatch[0]) ? urlMatch[0] : MISSING_SOURCE_LABEL;
    const yearValue =
      story.submittedAt && /^\d{4}/.test(story.submittedAt)
        ? story.submittedAt.slice(0, 4)
        : MISSING_SOURCE_LABEL;

    list.push({
      id: `contrib-${story.id}`,
      contributorName: story.authorName || MISSING_SOURCE_LABEL,
      role: story.authorRole || MISSING_SOURCE_LABEL,
      contribution: story.title,
      sourceReference: refText,
      year: yearValue,
      url: extractedUrl,
      isSample: Boolean(story.isSample),
    });
  }

  return list;
}
