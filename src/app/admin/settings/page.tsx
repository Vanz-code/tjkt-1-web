import { prisma } from '@/lib/prisma';
import { SettingsForm } from './SettingsForm';

export default async function Page() {
  const settings = await prisma.setting.findMany();
  return <SettingsForm initial={Object.fromEntries(settings.map((s) => [s.key, s.value]))} />;
}
