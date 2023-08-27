'use client'

export default function Props({ active, switchType }: { active: boolean; switchType: string }) {

	function colorSwitch(type: string) {
		switch (type) {
			case 'top':
				return 'amber'
			case 'new':
				return 'emerald'
		}
	}

	function textSwitch(type: string) {
		switch (type) {
			case 'top':
				return 'Top'
			case 'new':
				return 'Novinka'
		}
	}
	return (
		<>
			{active && (
				<div className={`text-xs font-medium bg-${colorSwitch(switchType)}-100 dark:bg-${colorSwitch(switchType)}-400/30 text-${colorSwitch(switchType)}-600 dark:text-${colorSwitch(switchType)}-400 rounded-full text-center px-2.5 py-1`}>
					{textSwitch(switchType)}
				</div>
			)}
		</>
	)
}

