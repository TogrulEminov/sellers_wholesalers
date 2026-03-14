import {Checkbox} from "antd";

export default function SelectAll() {
    return (
        <div
            className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between">
            <Checkbox className="text-slate-700 font-medium">
                Hamısını seç
            </Checkbox>
        </div>
    );
}
