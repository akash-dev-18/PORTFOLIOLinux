import { Folder, File, ArrowLeft, HardDrive } from 'lucide-react';
import { useState } from 'react';

interface FileItem {
	name: string;
	type: 'file' | 'folder';
}

const FS: Record<string, FileItem[]> = {
	'/': [
		{ name: 'home', type: 'folder' },
		{ name: 'etc', type: 'folder' },
		{ name: 'var', type: 'folder' },
		{ name: 'resume.pdf', type: 'file' },
	],
	'/home': [
		{ name: 'akash', type: 'folder' },
	],
	'/home/akash': [
		{ name: 'projects', type: 'folder' },
		{ name: 'notes.txt', type: 'file' },
	],
	'/home/akash/projects': [
		{ name: 'c2-framework', type: 'folder' },
		{ name: 'README.md', type: 'file' },
	],
};

export const FileManager = () => {
	const [path, setPath] = useState<string>('/');
	const items = FS[path] ?? [];

	const goUp = () => {
		if (path === '/') return;
		const parts = path.split('/').filter(Boolean);
		parts.pop();
		setPath('/' + parts.join('/'));
	};

	const openItem = (item: FileItem) => {
		if (item.type === 'folder') {
			const next = path === '/' ? `/${item.name}` : `${path}/${item.name}`;
			setPath(next);
			return;
		}
		if (item.name.endsWith('.pdf')) {
			window.open('/akashResume.pdf', '_blank');
		}
	};

	return (
		<div className="h-full flex flex-col gap-3">
			<div className="flex items-center gap-3 border-b border-primary/20 pb-2">
				<button className="taskbar-icon" onClick={goUp} title="Up one level">
					<ArrowLeft className="w-4 h-4 text-primary" />
				</button>
				<div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
					<HardDrive className="w-4 h-4 text-primary" />
					<span>{path}</span>
				</div>
			</div>

			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
				{items.map((item) => (
					<button
						key={item.name}
						className="desktop-folder p-3"
						onDoubleClick={() => openItem(item)}
						title={item.name}
					>
						{item.type === 'folder' ? (
							<Folder className="w-8 h-8 text-primary mb-1" />
						) : (
							<File className="w-8 h-8 text-secondary mb-1" />
						)}
						<span className="text-xs font-mono text-foreground truncate w-full">
							{item.name}
						</span>
					</button>
				))}
			</div>
		</div>
	);
}; 