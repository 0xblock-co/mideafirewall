import s from "@/components/Button/Button.module.scss";
export const ButtonComponent = () => {
    return (
        <div className={s.m_button_wrapper}>
            <button className={`btn btn-primary ${s.m_button_custom}`}>ButtonComponent</button>
        </div>
    );
};
