declare function HmrcOdxCheckAnswers(props: any): JSX.Element;
declare namespace HmrcOdxCheckAnswers {
    namespace defaultProps {
        const NumCols: number;
        const templateOverrideMode: string;
        const children: never[];
    }
    namespace propTypes {
        export const label: PropTypes.Requireable<string>;
        export const getPConnect: PropTypes.Validator<(...args: any[]) => any>;
        const children_1: PropTypes.Validator<PropTypes.ReactNodeLike[]>;
        export { children_1 as children };
        export const template: PropTypes.Validator<string>;
    }
}
export default HmrcOdxCheckAnswers;
import PropTypes from "prop-types";
//# sourceMappingURL=index.d.ts.map