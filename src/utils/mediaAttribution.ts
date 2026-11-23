import { isValidPublicUrl } from './urlValidator';

export interface MediaAttributionInfo {
  provider: string;
  providerEn: string;
  photoId: string | null;
  sourceUrl: string | null;
  license: string;
  licenseEn: string;
  isIllustrativeRealPhoto: boolean;
  captionVi: string;
  captionEn: string;
}

/**
 * Extracts verified public photo attribution from an image URL.
 * All curated festival images come from real Pexels photography (not AI-generated).
 */
export function getMediaAttribution(
  imageUrl?: string,
  customSourceNote?: string
): MediaAttributionInfo {
  const url = (imageUrl || '').trim();
  const pexelsMatch = url.match(/images\.pexels\.com\/photos\/(\d+)\//i);

  if (pexelsMatch && pexelsMatch[1]) {
    const photoId = pexelsMatch[1];
    const photoPageUrl = `https://www.pexels.com/photo/${photoId}/`;
    const safeUrl = isValidPublicUrl(photoPageUrl) ? photoPageUrl : null;
    return {
      provider: 'Pexels',
      providerEn: 'Pexels',
      photoId,
      sourceUrl: safeUrl,
      license: 'Giấy phép Pexels miễn phí bản quyền (Ảnh chụp thật minh họa)',
      licenseEn: 'Pexels Free-to-Use License (Real Illustrative Photograph)',
      isIllustrativeRealPhoto: true,
      captionVi: `Ảnh chụp thật minh họa • Nguồn: Pexels #${photoId} (Không dùng ảnh AI)`,
      captionEn: `Real illustrative photo • Source: Pexels #${photoId} (No AI imagery)`,
    };
  }

  return {
    provider: customSourceNote?.trim() || 'Nguồn do người đóng góp khai báo',
    providerEn: customSourceNote?.trim() || 'Contributor-declared source',
    photoId: null,
    sourceUrl: isValidPublicUrl(url) ? url : null,
    license: customSourceNote?.trim() || 'Tư liệu thật có phép sử dụng & ghi nguồn',
    licenseEn: customSourceNote?.trim() || 'Permitted real media with attribution',
    isIllustrativeRealPhoto: true,
    captionVi: customSourceNote?.trim()
      ? `Ảnh/tư liệu thật • Nguồn: ${customSourceNote.trim()}`
      : 'Ảnh thật do người đóng góp cung cấp (đã xác nhận bản quyền)',
    captionEn: customSourceNote?.trim()
      ? `Real media • Source: ${customSourceNote.trim()}`
      : 'Real contributor photo (permission confirmed)',
  };
}

/**
 * Detects accidental exposure of third-party private phone numbers or emails in public text.
 */
export function detectExposedContactPII(text: string): {
  hasEmail: boolean;
  hasPhone: boolean;
} {
  const value = text || '';
  const hasEmail = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/i.test(value);
  // Matches Vietnamese mobile/landline patterns like 0912345678, 0912 345 678, +84 912 345 678
  const hasPhone = /(?:\+84|0)(?:\s*[.-]?\s*\d){8,10}/.test(value);
  return { hasEmail, hasPhone };
}

export interface CommunitySafeguardInput {
  consentMediaLicense: boolean;
  consentRestrictedExcluded: boolean;
  consentPrivacyNonDisclosure: boolean;
  customImageUrl?: string;
  sourceReference?: string;
  content: string;
}

export interface ValidationResult {
  valid: boolean;
  errorVi?: string;
  errorEn?: string;
}

export function validateCommunitySafeguards(input: CommunitySafeguardInput): ValidationResult {
  if (!input.consentMediaLicense) {
    return {
      valid: false,
      errorVi:
        'Vui lòng xác nhận ảnh/tư liệu đính kèm có phép, ghi rõ nguồn và không dùng ảnh do AI tạo thay cho hiện vật, di tích hay nghệ nhân thật.',
      errorEn:
        'Please confirm all attached media/notes are permitted, properly credited, and do not use AI-generated images for real artifacts, monuments, or artisans.',
    };
  }

  if (!input.consentRestrictedExcluded) {
    return {
      valid: false,
      errorVi:
        'Vui lòng xác nhận đã loại bỏ toàn bộ nội dung nhạy cảm hoặc phần mà người giữ tư liệu/nghệ nhân dặn không công bố.',
      errorEn:
        'Please confirm you have excluded any sacred/sensitive details custodians or artisans asked not to publish.',
    };
  }

  if (!input.consentPrivacyNonDisclosure) {
    return {
      valid: false,
      errorVi:
        'Vui lòng xác nhận không công bố thông tin riêng của người khác khi chưa được đồng ý và đồng ý hiển thị bút danh đã chọn.',
      errorEn:
        'Please confirm you are not publishing anyone’s private information without consent and agree to publish under your chosen display name.',
    };
  }

  if (input.customImageUrl?.trim()) {
    if (!isValidPublicUrl(input.customImageUrl.trim())) {
      return {
        valid: false,
        errorVi: 'Đường dẫn ảnh không hợp lệ hoặc không thuộc liên kết công khai an toàn (https://).',
        errorEn: 'Image URL must be a valid public https:// URL.',
      };
    }
    if (!input.sourceReference?.trim()) {
      return {
        valid: false,
        errorVi: 'Khi đính kèm ảnh từ liên kết riêng, vui lòng ghi rõ tác giả/nguồn cấp phép ở ô Nguồn gốc tư liệu.',
        errorEn: 'When providing an external image URL, please credit the photographer/license source in Source References.',
      };
    }
  }

  const pii = detectExposedContactPII(input.content);
  if (pii.hasEmail || pii.hasPhone) {
    return {
      valid: false,
      errorVi:
        'Phát hiện số điện thoại hoặc địa chỉ email trong nội dung công khai. Vui lòng xóa thông tin liên hệ riêng để bảo vệ quyền riêng tư của người khác.',
      errorEn:
        'Detected a phone number or email address inside public story text. Please remove private contact information before submitting.',
    };
  }

  return { valid: true };
}

export interface AdminSafeguardInput {
  consentRealMediaAttribution: boolean;
  consentCustodianNonDisclosure: boolean;
  customImageUrl?: string;
  imageSourceNote?: string;
}

export function validateAdminEventSafeguards(input: AdminSafeguardInput): ValidationResult {
  if (!input.consentRealMediaAttribution) {
    return {
      valid: false,
      errorVi:
        'Cần xác nhận ảnh đại diện là ảnh thật được phép sử dụng & ghi nguồn, không dùng ảnh AI thay cho di tích/hiện vật/nghệ nhân thật.',
      errorEn:
        'Please confirm the festival photo is permitted real photography with attribution (not AI-generated imagery of real sites/artisans).',
    };
  }
  if (!input.consentCustodianNonDisclosure) {
    return {
      valid: false,
      errorVi:
        'Cần xác nhận đã tôn trọng và không đưa vào hệ thống những phần tư liệu mà người giữ tư liệu dặn không công bố.',
      errorEn:
        'Please confirm sensitive details requested by custodians to remain unpublished have been excluded.',
    };
  }
  if (input.customImageUrl?.trim() && !isValidPublicUrl(input.customImageUrl.trim())) {
    return {
      valid: false,
      errorVi: 'Link ảnh phải là URL công khai https:// hợp lệ.',
      errorEn: 'Image URL must be a valid public https:// link.',
    };
  }
  if (input.customImageUrl?.trim() && !input.imageSourceNote?.trim()) {
    return {
      valid: false,
      errorVi: 'Vui lòng ghi rõ nguồn tác giả/giấy phép của đường dẫn ảnh mới.',
      errorEn: 'Please provide the photographer/license source for the custom image URL.',
    };
  }
  return { valid: true };
}
