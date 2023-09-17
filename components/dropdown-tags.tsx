'use client'

import axios from 'axios'
import ModalBlank from '@/components/modal-blank'
import { Popover, Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'

export interface Tag {
    _id: string
    name: string
}

export default function DropdownTag() {

    const [tags, setTags] = useState<Tag[]>([])
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [tagName, setTagName] = useState<string>('')

    useEffect(() => {
        axios.get('/api/products/tags')
            .then(res => setTags(res.data))
            .catch(err => console.log(err))
    }, [])

    async function createTag() {
        await axios.post('/api/products/tags', { name: tagName })
        window.location.reload()
    }


    async function deleteTag(id: string) {
        await axios.delete(`/api/products/tags?id=${id}`)
        window.location.reload()
    }

    return (
        <>
            <Popover className="relative inline-flex">
                <Popover.Button className="btn bg-white dark:bg-slate-800 border-slate-200 hover:border-slate-300 dark:border-slate-700 dark:hover:border-slate-600 text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
                    Tags
                </Popover.Button>
                <Transition
                    className="origin-top-right z-10 absolute top-full left-0 right-auto min-w-[14rem] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 pt-1.5 rounded shadow-lg overflow-hidden mt-1 md:left-0 md:right-auto"
                    enter="transition ease-out duration-200 transform"
                    enterFrom="opacity-0 -translate-y-2"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-out duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Popover.Panel>
                        {({ close }) => (
                            <>
                                <ul className="mb-4">
                                    {tags.map((tag: Tag) => (
                                        <li className="py-1 px-3 flex justify-between" key={tag._id}>
                                            <label className="flex items-center">
                                                <input type="checkbox" className="form-checkbox" />
                                                <span className="text-sm font-medium ml-2">{tag.name}</span>
                                            </label>
                                            <button className="text-rose-500 hover:text-rose-600 rounded-full" onClick={() => { deleteTag(tag._id) }} type="button">
                                                <span className="sr-only">Delete</span>
                                                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                                    <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                                                    <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                                                </svg>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                <div className="py-2 px-3 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/20">
                                    <ul className="flex items-center justify-between">
                                        <li>
                                            <button className="btn-xs bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-500 dark:text-slate-300 hover:text-slate-600 dark:hover:text-slate-200">Clear</button>
                                        </li>
                                        <li>
                                            <button className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => { close(); setModalOpen(true) }} type="button">New</button>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        )}
                    </Popover.Panel>
                </Transition>
            </Popover>
            <ModalBlank isOpen={modalOpen} setIsOpen={setModalOpen}>
                <div className="p-5 flex space-x-4">
                    {/* Icon */}
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-emerald-100 dark:bg-emerald-500/30">
                        <svg className="w-4 h-4 shrink-0 fill-current text-emerald-500" viewBox="0 0 16 16">
                            <path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 12c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-3H7V4h2v5z" />
                        </svg>
                    </div>
                    {/* Content */}
                    <div className="w-full">
                        {/* Modal header */}
                        <div className="mb-2">
                            <div className="text-lg font-semibold text-slate-800 dark:text-slate-100">New tag</div>
                        </div>
                        {/* Modal content */}
                        <div className="text-sm mb-10">
                                <input id="" className="form-input w-full" type="text" value={tagName} onChange={(e) => { setTagName(e.target.value) }} />
                        </div>
                        {/* Modal footer */}
                        <div className="flex flex-wrap justify-end space-x-2">
                            <button className="btn-sm border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-300" onClick={() => { setModalOpen(false) }}>Cancel</button>
                            <button className="btn-sm bg-emerald-500 hover:bg-emerald-600 text-white" onClick={() => { createTag() }}>New</button>
                        </div>
                    </div>
                </div>
            </ModalBlank>
        </>
    )
}