import { useTranslation } from 'react-i18next'

interface HelpMeWritePopupProps {
  field: string
  suggestion: string
  onAccept: () => void
  onEdit: () => void
  onDiscard: () => void
}

const HelpMeWritePopup: React.FC<HelpMeWritePopupProps> = ({ field, suggestion, onAccept, onEdit, onDiscard }) => {
  const { t } = useTranslation()

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" role="dialog" aria-modal="true">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full">
        <h3 className="text-lg font-semibold mb-4">{t('helpMeWrite')}</h3>
        <p className="mb-4">{suggestion}</p>
        <div className="flex justify-end gap-4">
          <button onClick={onAccept} className="bg-blue-600 text-white px-4 py-2 rounded">{t('accept')}</button>
          <button onClick={onEdit} className="bg-gray-200 px-4 py-2 rounded">{t('edit')}</button>
          <button onClick={onDiscard} className="bg-red-600 text-white px-4 py-2 rounded">{t('discard')}</button>
        </div>
      </div>
    </div>
  )
}

export default HelpMeWritePopup