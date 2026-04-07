/**
 * Client HTTP vers le backend Finacom (ouverture de compte → dossiers PENDING côté admin).
 * - Dev sans variable : préfixe `/finacom` (proxy Vite → localhost:8080, évite les blocages CORS).
 * - Sinon : `VITE_FINACOM_API_URL` (ex. http://localhost:8080 ou URL de prod).
 */
export function getFinacomApiBase(): string {
  const raw = import.meta.env.VITE_FINACOM_API_URL as string | undefined;
  if (raw?.trim()) return raw.replace(/\/$/, '').trim();
  if (import.meta.env.DEV) return '/finacom';
  return 'http://localhost:8080';
}

export type FinacomDestinator = 'PERSONNE_PHYSIQUE' | 'PERSONNE_MORALE' | 'ASSOCIATION';

export interface DocumentRequisItem {
  uuid: string;
  libelle: string;
  description?: string;
}

export function accountTypeToFinacomDestinator(accountTypeId: string): FinacomDestinator | null {
  switch (accountTypeId) {
    case 'epargne':
    case 'personne_physique':
    case 'entreprise_individuelle':
      return 'PERSONNE_PHYSIQUE';
    case 'societe':
      return 'PERSONNE_MORALE';
    case 'association':
      return 'ASSOCIATION';
    default:
      return null;
  }
}

export async function fetchDocumentsRequis(destinator: FinacomDestinator): Promise<DocumentRequisItem[]> {
  const res = await fetch(
    `${getFinacomApiBase()}/api/v1/public/mobile/documents-requis/by-destinator/${destinator}`
  );
  if (!res.ok) {
    throw new Error(`Impossible de charger les pièces requises (${res.status}). Vérifiez que le serveur Finacom est démarré.`);
  }
  const data = (await res.json()) as DocumentRequisItem[];
  return Array.isArray(data) ? data : [];
}

function appendMultipart(data: object, filesByUuid: Record<string, File | undefined>): FormData {
  const fd = new FormData();
  fd.append('data', JSON.stringify(data));
  for (const [uuid, file] of Object.entries(filesByUuid)) {
    if (file) fd.append(uuid, file);
  }
  return fd;
}

function parseErrorMessage(text: string, status: number): string {
  const t = text.trim();
  if (!t) return `Échec de l’envoi (${status})`;
  try {
    const j = JSON.parse(t) as { message?: string; error?: string };
    if (typeof j.message === 'string') return j.message;
    if (typeof j.error === 'string') return j.error;
  } catch {
    /* pas du JSON */
  }
  return t.length > 280 ? `${t.slice(0, 280)}…` : t;
}

async function postMultipart(url: string, fd: FormData): Promise<{ numeroClient?: string; id?: string }> {
  const res = await fetch(url, {
    method: 'POST',
    body: fd,
    credentials: 'omit',
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(parseErrorMessage(text, res.status));
  }
  return res.json() as Promise<{ numeroClient?: string; id?: string }>;
}

export async function submitProspectPhysique(
  payload: Record<string, unknown>,
  filesByUuid: Record<string, File | undefined>
): Promise<{ numeroClient?: string; id?: string }> {
  const fd = appendMultipart(payload, filesByUuid);
  return postMultipart(
    `${getFinacomApiBase()}/api/v1/public/mobile/client/prospect/physique/create`,
    fd
  );
}

export async function submitProspectMoral(
  payload: Record<string, unknown>,
  filesByUuid: Record<string, File | undefined>
): Promise<{ numeroClient?: string; id?: string }> {
  const fd = appendMultipart(payload, filesByUuid);
  return postMultipart(
    `${getFinacomApiBase()}/api/v1/public/mobile/client/prospect/moral/create`,
    fd
  );
}

export async function submitProspectAssociation(
  payload: Record<string, unknown>,
  filesByUuid: Record<string, File | undefined>
): Promise<{ numeroClient?: string; id?: string }> {
  const fd = appendMultipart(payload, filesByUuid);
  return postMultipart(
    `${getFinacomApiBase()}/api/v1/public/mobile/client/prospect/association/create`,
    fd
  );
}
