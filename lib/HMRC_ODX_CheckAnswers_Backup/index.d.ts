declare function HmrcOdxCheckAnswers(props: any): JSX.Element;
declare namespace HmrcOdxCheckAnswers {
    namespace defaultProps {
        const label: undefined;
        const showLabel: boolean;
        const showHighlightedData: boolean;
    }
    namespace propTypes {
        export const regionsMetadata: PropTypes.Validator<((PropTypes.InferProps<{
            value: PropTypes.Requireable<NonNullable<string | number | boolean | null | undefined>>;
            label: PropTypes.Requireable<string>;
        }> | null | undefined)[] | null | undefined)[]>;
        const showLabel_1: PropTypes.Requireable<boolean>;
        export { showLabel_1 as showLabel };
        const label_1: PropTypes.Requireable<string>;
        export { label_1 as label };
        export const getPConnect: PropTypes.Validator<(...args: any[]) => any>;
        export const template: PropTypes.Validator<string>;
        const showHighlightedData_1: PropTypes.Requireable<boolean>;
        export { showHighlightedData_1 as showHighlightedData };
    }
}
export default HmrcOdxCheckAnswers;
import PropTypes from "prop-types";
//# sourceMappingURL=index.d.ts.map